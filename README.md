# BS Portal (Next.js + Supabase)

Portal publico y app privada para clientes de BS Electricidad & Domotica. Incluye landing, contacto, login/registro, dashboard y detalle de proyecto con documentos y avance de obra. Integra Supabase para auth, base de datos y storage, y un widget "Volti" configurable por API.

## Stack y requisitos

- Next.js 16 (Pages Router) con React 19 y TypeScript.
- Tailwind CSS v4.
- Node 18.18+ (recomendado Node 20) y npm como package manager.
- Scripts: `npm run dev`, `npm run lint`, `npm run build`, `npm run start`.
- Build output: `.next/`.

## Setup local

1. Instala Node 18.18+ (20 recomendado) y npm.
2. Copia el entorno: `cp .env.local.example .env.local`.
3. Completa las variables en `.env.local` con tu proyecto Supabase y OpenAI. Para probar sin auth real, puedes usar `NEXT_PUBLIC_INTERNAL_BYPASS=true` solo en local (no usar en produccion).
4. Instala dependencias: `npm install`.
5. Corre en desarrollo: `npm run dev` (http://localhost:3000).
6. Chequeos opcionales: `npm run lint` y `npm run build` deben pasar con las variables cargadas.

## Variables de entorno (todas)

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`: proyecto Supabase (auth publica).
- `SUPABASE_SERVICE_ROLE_KEY`: llave de servicio para subir archivos en `/api/upload` y endpoints internos (solo server-side).
- `OPENAI_API_KEY`: para el bot Volti con LLM.
- `NEXT_PUBLIC_VOLTI_API_KEY` (opcional): API key publica si usas un backend externo para Volti.
- `NEXT_PUBLIC_VOLTI_API_URL` (opcional): endpoint del bot; por defecto `/api/volti`.
- `NEXT_PUBLIC_INTERNAL_EMAILS`: lista separada por coma con correos internos/admin (ej: `emanuel.s@live.com.ar`).
- `NEXT_PUBLIC_INTERNAL_BYPASS`: si `true`, permite logueo/uso interno sin Supabase (solo para desarrollo).

## Supabase esperado (core)

- Tablas: `clients`, `projects`, `estimates`, `documents`, `progress` (con RLS por usuario).
- Storage: bucket `documents` para archivos de proyecto.
- Auth por correo: `supabase.auth.signInWithPassword` y `signUp` ya conectados.

## Rutas principales

- `/` Landing con servicios, portfolio y CTA "Pedir visita tecnica".
- `/contacto` Formulario con validacion basica.
- `/login` y `/registro` Autenticacion de clientes.
- `/dashboard` Lista de proyectos (usa Supabase; cae a datos demo si falla).
- `/proyecto/[id]` Detalle con avance, checklist y documentos descargables.
- `/api/upload` Carga base64 a Storage (`documents/`), pensado para llamar desde formularios o edge functions.

## Modulo interno "Mi casa" (/app/home)

- Solo visible para usuarios internos/admin (metadata `role=internal` o email incluido en `NEXT_PUBLIC_INTERNAL_EMAILS`).
- Ruta: `/app/home`. Usa el plano `public/planos/home-plan.jpg` para vista general y planos por ambiente (`/planos/living.png`, `/planos/cocina.png`, `/planos/habitacion-leon.jpg`, `/planos/habitacion-eloy.jpg`).
- Render directo de imagen o PDF (pdf.js). Si cambias un plano, reemplaza el asset correspondiente o ajusta `plan_asset_url` por ambiente en BD.
- Zonas por ambiente (poligonos normalizados 0..1) + estado de Luces/Aires y zoom con toggles optimistas (API `/api/home/toggle`).

### My Home post-obra (assets reales)
- Planos y detalles en `public/planos/emanuel.s@live.com.ar/` (copiados desde `Media/Planos/emanuel.s@live.com.ar/`).
- Plano general: `plano_general.jpg`. Ambientes con slug: `living`, `comedor`, `cocina`, `lavadero`, `pasillo`, `habitacion-principal`, `habitacion-secundaria`, `bano-principal`, `bano-secundario`.
- Cada ambiente tiene `detail_image_url` apuntando a su imagen; las luminarias se sembraron a partir de las cruces rojas de cada detalle.
- Consumo simulado (luces 12W, aires 1200W) recalculado en tiempo real.
- Rutinas simuladas (`routines` table) con API `/api/home/routines` para pausar/ejecutar y afectar luces/aires virtuales.
- Modo edición solo interno: toggle “Editar”; Alt+click en el plano general mueve el polígono del ambiente activo, y en el zoom puedes arrastrar cada dispositivo para moverlo (persiste vía `/api/home/room` y `/api/home/device`).

### Schema y seed en Supabase
1. Importa `supabase/home-schema.sql` en el editor SQL.
   - Reemplaza `:OWNER_USER_ID` por el `id` del usuario interno.
   - El `plan_asset_url` apunta a `/planos/emanuel.s@live.com.ar/plano_general.jpg` por defecto.
2. Marca el usuario interno con metadata `role=internal` (Auth > Users) o agrega su correo en `NEXT_PUBLIC_INTERNAL_EMAILS`.
3. Ajusta poligonos/bbox/positions (json normalizado):
   - `polygon`: lista `{x:0..1,y:0..1}` respecto del ancho/alto del plano.
   - `bbox`: rectangulo de apoyo `{x,y,width,height}` opcional.
   - `devices.position`: coords normalizadas sobre el plano.
   - `room_telemetry`: opcional `temperature_c`, `humidity`.
4. Realtime: el cliente se subscribe a `devices` y cae a polling cada 4.5s; RLS limita a owner.

### Toggle / feedback
- `/api/home/toggle` requiere header `Authorization: Bearer <supabase_access_token>`.
- Actualiza `devices.is_on` + `last_changed_at` y valida que el device pertenezca al `home`.
- La UI hace update optimista y revierte si falla el endpoint.

## Despliegue en Vercel (checklist)

1. Importa el repo en Vercel con rama `main` como produccion y habilita Preview Deploys para PR y ramas (`feature/*`).
2. Build:
   - Install: `npm ci`
   - Build: `npm run build`
   - Output: `.next` (default). Node 20 en runtime de Vercel.
   - No se requiere `vercel.json` por ahora; agregalo si necesitas rewrites/headers/edge.
3. Variables en Vercel (Production y Preview):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_VOLTI_API_KEY`
   - `NEXT_PUBLIC_VOLTI_API_URL` (usa `/api/volti` por defecto)
   - `NEXT_PUBLIC_INTERNAL_EMAILS`
   - `NEXT_PUBLIC_INTERNAL_BYPASS` (`false` en prod; opcional `true` en preview/local)
4. Resultado esperado:
   - Push/PR => Vercel genera Preview URL automatica.
   - Merge en `main` => deploy a produccion sin pasos manuales.

## Workflow Git con Codex

- Rama base: `main`. Trabaja en `feature/<nombre>` para cada cambio.
- Antes de pushear: `npm run lint` y `npm run build` (usa `.env.local` copiado del example).
- Push de la feature => CI (GitHub Actions) corre lint + build y Vercel crea Preview Deploy.
- Abre PR contra `main`, revisa/mergea. Vercel despliega a produccion al merge, sin copiar codigo ni comandos manuales.
