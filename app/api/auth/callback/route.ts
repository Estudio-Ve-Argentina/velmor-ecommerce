import { NextRequest, NextResponse } from "next/server";

// Tienda Nube OAuth callback route
// After authorizing the app at:
// https://www.tiendanube.com/apps/28475/authorize
// Tienda Nube redirects here with a `code` query parameter.
// We exchange it for an access token.

const CLIENT_ID = process.env.TIENDANUBE_CLIENT_ID || "28475";
const CLIENT_SECRET = process.env.TIENDANUBE_CLIENT_SECRET || "9dc349b6cf982da72252f3ebd15908c810d2319070c4d24f";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No authorization code provided" }, { status: 400 });
  }

  try {
    const response = await fetch("https://www.tiendanube.com/apps/authorize/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Token exchange failed", details: data },
        { status: 500 }
      );
    }

    // Return the token data for manual copy
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <title>Access Token Obtenido</title>
  <style>
    body { font-family: monospace; background: #0a0a0a; color: #00ff00; padding: 40px; }
    pre { background: #111; padding: 20px; border-radius: 8px; border: 1px solid #00ff00; white-space: pre-wrap; word-break: break-all; }
    .token { font-size: 14px; color: #fff; background: #222; padding: 10px; border-radius: 4px; margin: 10px 0; }
    h2 { color: #00ff00; }
    p { color: #aaa; }
  </style>
</head>
<body>
  <h2>✅ Token obtenido correctamente</h2>
  <p>Copiá el <strong>access_token</strong> y pegalo en el archivo <code>.env.local</code> como <code>TIENDANUBE_ACCESS_TOKEN</code>:</p>
  <div class="token">${data.access_token || "No encontrado"}</div>
  <p>Datos completos:</p>
  <pre>${JSON.stringify(data, null, 2)}</pre>
</body>
</html>`,
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  } catch (error) {
    return NextResponse.json({ error: "Internal error", details: String(error) }, { status: 500 });
  }
}
