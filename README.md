# BS Portal (Next.js + Supabase)

Portal publico y app privada para clientes de BS Electricidad & Domotica. Incluye landing, contacto, login/registro, dashboard y detalle de proyecto con documentos y avance de obra. Integra Supabase para auth, base de datos y storage, y un widget "Volti" configurable por API.

## Configuracion rapida

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Copiar variables de entorno:
   ```bash
   cp .env.local.example .env.local
   # Completa SUPABASE y VOLTI antes de correr la app
   ```
3. Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```
   App en `http://localhost:3000`.

## Variables necesarias

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`: proyecto Supabase (auth publica).
- `SUPABASE_SERVICE_ROLE_KEY`: llave de servicio para subir archivos en `/api/upload`.
- `OPENAI_API_KEY`: para el bot Volti con LLM.
- `NEXT_PUBLIC_VOLTI_API_KEY` (opcional), `NEXT_PUBLIC_VOLTI_API_URL` (por defecto `/api/volti`): config del widget Volti.
- `NEXT_PUBLIC_INTERNAL_EMAILS`: lista separada por coma con correos internos/admin (ej: `emanuel.s@live.com.ar`).

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

### Schema y seed en Supabase
1. Importa `supabase/home-schema.sql` en el editor SQL.
   - Reemplaza `:OWNER_USER_ID` por el `id` del usuario interno.
   - El `plan_asset_url` apunta a `/planos/home-plan.pdf` por defecto.
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

## Despliegue en Vercel

- Next.js 16 con Pages Router y Tailwind CSS (v4). `next.config.ts` ya habilita imagenes de Unsplash.
- Define variables en el dashboard de Vercel. Sin `SUPABASE_*` la app no inicia.
- Conecta el repo y despliega: `vercel --prod` (opcional `vercel.json` para edge).
