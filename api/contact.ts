// api/contact.ts — Vercel Edge Function : envoi du formulaire de contact via Resend
// Reçoit { name, email, subject, message }, envoie un email à contact@erudia.app.
// Variable d'environnement requise : RESEND_API_KEY

export const config = { runtime: 'edge' }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
  _trap?: string // honeypot
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const { name, email, subject, message, _trap } = body as ContactPayload

  // Honeypot anti-spam : si le champ caché est rempli, on simule un succès silencieux
  if (_trap) {
    return json({ success: true }, 200)
  }

  // Validation minimale côté serveur
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return json({ error: 'Invalid name' }, 400)
  }
  if (!email || !EMAIL_RE.test(email)) {
    return json({ error: 'Invalid email' }, 400)
  }
  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    return json({ error: 'Invalid subject' }, 400)
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return json({ error: 'Invalid message' }, 400)
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return json({ error: 'Server misconfigured' }, 500)
  }

  const fromAddress = 'Erudia Contact <noreply@erudia.app>'
  const toAddress   = 'contact@erudia.app'

  const htmlBody = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #667eea;">Nouveau message de contact — Erudia</h2>
      <table style="width:100%; border-collapse:collapse;">
        <tr><td style="padding:8px 0; font-weight:bold; width:100px;">Nom</td><td>${escHtml(name)}</td></tr>
        <tr><td style="padding:8px 0; font-weight:bold;">Email</td><td><a href="mailto:${escHtml(email)}">${escHtml(email)}</a></td></tr>
        <tr><td style="padding:8px 0; font-weight:bold;">Sujet</td><td>${escHtml(subject)}</td></tr>
      </table>
      <hr style="margin:16px 0; border:none; border-top:1px solid #eee;" />
      <p style="white-space:pre-wrap; line-height:1.7;">${escHtml(message)}</p>
      <hr style="margin:16px 0; border:none; border-top:1px solid #eee;" />
      <p style="font-size:0.8rem; color:#999;">Répondre directement à cet email pour contacter ${escHtml(name)}.</p>
    </div>
  `

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:     fromAddress,
      to:       [toAddress],
      reply_to: email,
      subject:  `[Erudia Contact] ${subject} — ${name}`,
      html:     htmlBody,
    }),
  })

  if (resendRes.ok) {
    return json({ success: true }, 200)
  }

  const data = await resendRes.json().catch(() => ({}))
  const errMsg = (data as { message?: string })?.message ?? 'Resend error'
  console.error('[contact] Resend error', resendRes.status, errMsg)
  return json({ error: 'send_failed' }, 500)
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
