# BS Portal (Next.js + Supabase)

Portal público y app privada para clientes de BS Electricidad & Domótica. Incluye landing, contacto, login/registro, dashboard y detalle de proyecto con documentos y avance de obra. Integra Supabase para auth, base de datos y storage, y un widget “Volti” configurable por API.

## Configuración rápida

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

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Proyecto Supabase (auth pública).
- `SUPABASE_SERVICE_ROLE_KEY`: Llave de servicio para subir archivos en `/api/upload`.
- `NEXT_PUBLIC_VOLTI_API_KEY`, `NEXT_PUBLIC_VOLTI_API_URL`: Credenciales/endpoint del bot Volti.

## Supabase esperado

- Tablas: `clients`, `projects`, `estimates`, `documents`, `progress` (con RLS por usuario).
- Storage: bucket `documents` para archivos de proyecto.
- Auth por correo: `supabase.auth.signInWithPassword` y `signUp` ya conectados.

## Rutas principales

- `/` Landing con servicios, portfolio y CTA “Pedir visita técnica”.
- `/contacto` Formulario con validación básica.
- `/login` y `/registro` Autenticación de clientes.
- `/dashboard` Lista de proyectos (usa Supabase; cae a datos demo si falla).
- `/proyecto/[id]` Detalle con avance, checklist y documentos descargables.
- `/api/upload` Carga base64 a Storage (`documents/`), pensado para llamar desde formularios o edge functions.

## Despliegue en Vercel

- Next.js 16 con Pages Router y Tailwind CSS (v4). `next.config.ts` ya habilita imágenes de Unsplash.
- Define variables en el dashboard de Vercel. Sin `SUPABASE_*` la app no inicia.
- Conecta el repo y despliega: `vercel --prod` (opcional `vercel.json` para edge).
