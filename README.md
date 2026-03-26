# 🛍️ Tienda Nube × Next.js — Starter Template

Un starter **listo para producción** para construir storefronts custom sobre cualquier tienda Tienda Nube. Forkeá este repo, conectá la tienda del cliente, y enfocate solo en diseño y branding.

---

## ¿Qué incluye?

| Área | Qué viene resuelto |
|------|--------------------|
| **Backend** | Cliente de API completo para Tienda Nube (productos, órdenes, stock, categorías) |
| **Auth** | Flujo OAuth automático para obtener el access token del cliente |
| **Productos** | Grilla con filtros por categoría, cards, página de detalle, variantes |
| **Carrito** | Estado global persistente (Zustand), drawer lateral, checkout hacia TN |
| **Admin** | Panel básico para ver órdenes y stock en tiempo real |
| **SEO** | Metadata dinámica por producto desde la API |
| **DX** | TypeScript estricto, caché ISR de 60s, recarga automática de env vars |

---

## Stack

- **Next.js 15** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (carrito)
- **Tienda Nube API v1**

---

## 🚀 Setup para un nuevo cliente

### 1. Forkear / clonar

```bash
git clone https://github.com/TU_ORG/tn-starter.git nombre-cliente
cd nombre-cliente
npm install
```

### 2. Configurar las variables de entorno

Copiá el archivo de ejemplo:

```bash
cp .env.local.example .env.local
```

Completá con los datos de la app del cliente en el [Portal de Partners de Tienda Nube](https://partners.tiendanube.com):

```env
TIENDANUBE_CLIENT_ID="tu_app_id"
TIENDANUBE_CLIENT_SECRET="tu_client_secret"
TIENDANUBE_STORE_ID=""          # se completa en el paso 4
TIENDANUBE_ACCESS_TOKEN=""      # se completa en el paso 4
NEXT_PUBLIC_TIENDANUBE_STORE_URL="https://nombretienda.mitiendanube.com"
```

### 3. Levantar el servidor

```bash
npm run dev
```

El servidor debe estar corriendo en `http://localhost:3000` para que funcione el callback OAuth.

### 4. Obtener el Access Token del cliente

> ⚠️ **Importante**: el cliente debe hacer este paso logueado con SU cuenta de Tienda Nube (no la tuya de partner, no una tienda demo).

1. El cliente abre esta URL en su navegador (reemplazá `CLIENT_ID`):
   ```
   https://www.tiendanube.com/apps/CLIENT_ID/authorize
   ```
2. Acepta los permisos
3. Es redirigido a `http://localhost:3000/api/auth/callback`
4. Una pantalla verde muestra el `access_token` y el `user_id`

Copiá esos valores al `.env.local`:

```env
TIENDANUBE_STORE_ID="user_id_del_callback"
TIENDANUBE_ACCESS_TOKEN="access_token_del_callback"
```

> El `user_id` del callback **ES** el Store ID. Son el mismo valor.

No hace falta reiniciar — Next.js recarga el `.env.local` automáticamente.

### 5. Verificar

Abrí `http://localhost:3000` — los productos de la tienda deben aparecer.

---

## Personalizar para el cliente

Todo lo que cambia por cliente vive en estos archivos:

| Archivo | Qué customizar |
|---------|---------------|
| `app/globals.css` | Colores, tipografía, variables de diseño |
| `components/header.tsx` | Logo, navegación |
| `components/hero-section.tsx` | Hero, copy principal |
| `components/footer.tsx` | Links, redes sociales |
| `public/` | Imágenes y assets del cliente |
| `lib/blog-data.ts` | Contenido del blog (si aplica) |
| `content/` | Textos estáticos (FAQ, historia, etc.) |

El backend (API, carrito, checkout, productos) **no se toca**.

---

## Arquitectura del backend

```
lib/
  tiendanube.ts         ← Cliente de API central. Todo pasa por acá.

app/api/tiendanube/
  products/route.ts     ← GET /api/tiendanube/products
  products/[id]/route.ts
  orders/route.ts       ← GET /api/tiendanube/orders
  stock/route.ts        ← PUT /api/tiendanube/stock
  checkout/route.ts     ← POST /api/tiendanube/checkout

app/api/auth/
  callback/route.ts     ← OAuth callback — obtiene el access token
```

### Cómo funciona la autenticación con Tienda Nube

```
Cliente Browser               Tienda Nube             Este servidor
     │                            │                        │
     ├──── GET /apps/ID/authorize ─►                       │
     │                            │                        │
     │◄── redirect /?code=xxx ────┘                        │
     │                                                     │
     ├──── GET /api/auth/callback?code=xxx ───────────────►│
     │                            │                        │
     │                            ◄── exchange code ───────┤
     │                            ├── {access_token} ─────►│
     │                                                     │
     │◄── muestra access_token + user_id ─────────────────┘
```

> Headers: Tienda Nube usa `Authentication: bearer TOKEN` (no `Authorization`).

---

## Notas importantes

- **Tokens**: no expiran, pero si el cliente desinstala la app se invalidan. Volvé a correr el OAuth.
- **`.env.local`** está en `.gitignore`. Nunca subas credenciales al repo.
- **Caché**: los datos de productos se cachean 60 segundos (ISR). Editable en `components/products-grid.tsx`.
- **Tienda de prueba vs tienda real**: el OAuth genera un token específico para la tienda donde el usuario está logueado. Siempre verificar el `user_id` del callback coincida con el Store ID esperado.

---

## Checklist para onboarding de nuevo cliente

- [ ] Forkear el repo
- [ ] `cp .env.local.example .env.local`
- [ ] Completar `CLIENT_ID`, `CLIENT_SECRET`, `STORE_URL`
- [ ] `npm install && npm run dev`
- [ ] Cliente corre el OAuth desde SU cuenta → copiar `access_token` y `user_id`
- [ ] Verificar productos en `localhost:3000`
- [ ] Customizar `globals.css`, header, hero, footer con el branding del cliente
- [ ] Deploy a Vercel (configurar las env vars en el dashboard)
