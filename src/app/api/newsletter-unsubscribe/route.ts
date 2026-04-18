import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * GET /api/newsletter-unsubscribe?email=...
 *
 * Endpoint de desuscripción. El suscriptor hace clic en el link del email
 * y su campo `unsubscribed` se pone en true.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  if (!email) {
    return new NextResponse(renderPage('Error', 'No se proporcionó un email.', false), {
      headers: { 'Content-Type': 'text/html' },
      status: 400,
    })
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({ unsubscribed: true, unsubscribed_at: new Date().toISOString() })
      .eq('email', email)

    if (error) throw error

    return new NextResponse(
      renderPage(
        '¡Listo!',
        'Has sido removido de la lista. No recibirás más newsletters. Si fue un error, puedes volver a suscribirte en la web.',
        true
      ),
      { headers: { 'Content-Type': 'text/html' } }
    )
  } catch (err) {
    console.error('Unsubscribe error:', err)
    return new NextResponse(
      renderPage('Error', 'Ocurrió un error al procesar tu solicitud. Intenta de nuevo más tarde.', false),
      { headers: { 'Content-Type': 'text/html' }, status: 500 }
    )
  }
}

function renderPage(title: string, message: string, success: boolean) {
  const color = success ? '#4ade80' : '#f87171'
  const emoji = success ? '✅' : '❌'
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — Nitro Ecom</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #050505;
      font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh; padding: 24px;
    }
    .card {
      max-width: 480px; width: 100%;
      background: #111111;
      border: 1px solid #282828;
      border-radius: 16px;
      padding: 48px 40px;
      text-align: center;
    }
    .emoji { font-size: 48px; margin-bottom: 20px; }
    h1 { color: #ffffff; font-size: 24px; font-weight: 700; margin-bottom: 16px; }
    p { color: #a1a1aa; font-size: 15px; line-height: 1.7; margin-bottom: 32px; }
    .bar {
      height: 3px;
      background: linear-gradient(90deg, #16a34a, ${color});
      border-radius: 2px;
      margin-bottom: 32px;
    }
    a {
      display: inline-block;
      background: ${color};
      color: #050505;
      font-weight: 700;
      font-size: 14px;
      padding: 12px 28px;
      border-radius: 8px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="bar"></div>
    <div class="emoji">${emoji}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="https://www.juanarangoecommerce.com">Volver al sitio</a>
  </div>
</body>
</html>`
}
