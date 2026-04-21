// api/newsletter.ts — Vercel Edge Function : inscription newsletter via Brevo
// Proxifie l'appel Brevo côté serveur pour ne pas exposer la clé API au client.
// Variables d'environnement requises : BREVO_API_KEY, BREVO_LIST_ID

export const config = { runtime: 'edge' }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

  const email = (body as Record<string, unknown>)?.email
  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return json({ error: 'Invalid email' }, 400)
  }

  const apiKey = process.env.BREVO_API_KEY
  const listId = Number(process.env.BREVO_LIST_ID)

  if (!apiKey || !listId) {
    return json({ error: 'Server misconfigured' }, 500)
  }

  const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true,
    }),
  })

  // 201 = créé, 204 = déjà existant mis à jour
  if (brevoRes.status === 201 || brevoRes.status === 204) {
    return json({ success: true }, 200)
  }

  const data = await brevoRes.json().catch(() => ({}))
  const message = (data as { message?: string })?.message ?? 'Brevo error'
  return json({ error: message }, 400)
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}
