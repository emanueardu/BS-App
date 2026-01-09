-- Home module schema (run inside Supabase SQL editor or psql)

create table if not exists homes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_user_id uuid not null references auth.users(id),
  plan_asset_url text not null,
  created_at timestamptz default now()
);

create table if not exists rooms (
  id uuid primary key default gen_random_uuid(),
  home_id uuid not null references homes(id) on delete cascade,
  name text not null,
  slug text not null,
  polygon jsonb not null,
  bbox jsonb,
  plan_asset_url text,
  detail_image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists devices (
  id uuid primary key default gen_random_uuid(),
  home_id uuid not null references homes(id) on delete cascade,
  room_id uuid not null references rooms(id) on delete cascade,
  type text not null check (type in ('light','ac')),
  name text not null,
  position jsonb not null,
  is_on boolean default false,
  last_changed_at timestamptz default now(),
  created_at timestamptz default now()
);

create table if not exists room_telemetry (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references rooms(id) on delete cascade,
  temperature_c numeric,
  humidity numeric,
  updated_at timestamptz default now()
);

create table if not exists routines (
  id uuid primary key default gen_random_uuid(),
  home_id uuid not null references homes(id) on delete cascade,
  name text not null,
  description text,
  status text not null check (status in ('active','paused')) default 'active',
  cadence text,
  next_run_at timestamptz,
  last_run_at timestamptz,
  actions jsonb,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Safe alters (for existing projects)
alter table if exists rooms add column if not exists slug text;
alter table if exists rooms add column if not exists detail_image_url text;
update rooms set slug = coalesce(slug, lower(replace(name,' ','-'))) where slug is null;

-- Row Level Security
alter table homes enable row level security;
alter table rooms enable row level security;
alter table devices enable row level security;
alter table room_telemetry enable row level security;
alter table routines enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'homes' and policyname = 'homes_select_owner') then
    create policy homes_select_owner on homes for select using (auth.uid() = owner_user_id);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'homes' and policyname = 'homes_insert_owner') then
    create policy homes_insert_owner on homes for insert with check (auth.uid() = owner_user_id);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'rooms' and policyname = 'rooms_by_owner') then
    create policy rooms_by_owner on rooms for all using (
      home_id in (select id from homes where owner_user_id = auth.uid())
    ) with check (
      home_id in (select id from homes where owner_user_id = auth.uid())
    );
  end if;
  if not exists (select 1 from pg_policies where tablename = 'devices' and policyname = 'devices_by_owner') then
    create policy devices_by_owner on devices for all using (
      home_id in (select id from homes where owner_user_id = auth.uid())
    ) with check (
      home_id in (select id from homes where owner_user_id = auth.uid())
    );
  end if;
  if not exists (select 1 from pg_policies where tablename = 'room_telemetry' and policyname = 'telemetry_by_owner') then
    create policy telemetry_by_owner on room_telemetry for all using (
      room_id in (select id from rooms where home_id in (select id from homes where owner_user_id = auth.uid()))
    ) with check (
      room_id in (select id from rooms where home_id in (select id from homes where owner_user_id = auth.uid()))
    );
  end if;
  if not exists (select 1 from pg_policies where tablename = 'routines' and policyname = 'routines_by_owner') then
    create policy routines_by_owner on routines for all using (
      home_id in (select id from homes where owner_user_id = auth.uid())
    ) with check (
      home_id in (select id from homes where owner_user_id = auth.uid())
    );
  end if;
end $$;

-- Seed demo data (replace the user id with the internal/admin user)
-- :OWNER_USER_ID should be replaced by your Supabase auth user id.

insert into homes (id, name, owner_user_id, plan_asset_url)
values (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'Casa Emanuel',
  ':OWNER_USER_ID',
  '/planos/emanuel.s@live.com.ar/plano_general.jpg'
) on conflict (id) do nothing;

insert into rooms (id, home_id, name, slug, polygon, bbox, plan_asset_url, detail_image_url, sort_order) values
('11111111-1111-1111-1111-111111111001','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Living','living','[{"x":0.42,"y":0.55},{"x":0.84,"y":0.55},{"x":0.84,"y":0.95},{"x":0.42,"y":0.95}]','{"x":0.42,"y":0.55,"width":0.42,"height":0.4}','/planos/emanuel.s@live.com.ar/living.png','/planos/emanuel.s@live.com.ar/living.png',1),
('11111111-1111-1111-1111-111111111002','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Comedor','comedor','[{"x":0.52,"y":0.3},{"x":0.85,"y":0.3},{"x":0.85,"y":0.5},{"x":0.52,"y":0.5}]','{"x":0.52,"y":0.3,"width":0.33,"height":0.2}','/planos/emanuel.s@live.com.ar/comedor.png','/planos/emanuel.s@live.com.ar/comedor.png',2),
('11111111-1111-1111-1111-111111111003','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Cocina','cocina','[{"x":0.8,"y":0.18},{"x":0.98,"y":0.18},{"x":0.98,"y":0.38},{"x":0.8,"y":0.38}]','{"x":0.8,"y":0.18,"width":0.18,"height":0.2}','/planos/emanuel.s@live.com.ar/cocina.png','/planos/emanuel.s@live.com.ar/cocina.png',3),
('11111111-1111-1111-1111-111111111004','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Lavadero','lavadero','[{"x":0.38,"y":0.05},{"x":0.53,"y":0.05},{"x":0.53,"y":0.19},{"x":0.38,"y":0.19}]','{"x":0.38,"y":0.05,"width":0.15,"height":0.14}','/planos/emanuel.s@live.com.ar/lavadero.png','/planos/emanuel.s@live.com.ar/lavadero.png',4),
('11111111-1111-1111-1111-111111111005','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Pasillo','pasillo','[{"x":0.36,"y":0.44},{"x":0.51,"y":0.44},{"x":0.51,"y":0.64},{"x":0.36,"y":0.64}]','{"x":0.36,"y":0.44,"width":0.15,"height":0.2}','/planos/emanuel.s@live.com.ar/pasillo.png','/planos/emanuel.s@live.com.ar/pasillo.png',5),
('11111111-1111-1111-1111-111111111006','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Habitación Principal','habitacion-principal','[{"x":0.05,"y":0.62},{"x":0.35,"y":0.62},{"x":0.35,"y":0.93},{"x":0.05,"y":0.93}]','{"x":0.05,"y":0.62,"width":0.3,"height":0.31}','/planos/emanuel.s@live.com.ar/habitacion_leon.jpg','/planos/emanuel.s@live.com.ar/habitacion_leon.jpg',6),
('11111111-1111-1111-1111-111111111007','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Habitación Secundaria','habitacion-secundaria','[{"x":0.05,"y":0.42},{"x":0.35,"y":0.42},{"x":0.35,"y":0.62},{"x":0.05,"y":0.62}]','{"x":0.05,"y":0.42,"width":0.3,"height":0.2}','/planos/emanuel.s@live.com.ar/habitacion_eloy.jpg','/planos/emanuel.s@live.com.ar/habitacion_eloy.jpg',7),
('11111111-1111-1111-1111-111111111008','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Baño Principal','bano-principal','[{"x":0.33,"y":0.56},{"x":0.43,"y":0.56},{"x":0.43,"y":0.68},{"x":0.33,"y":0.68}]','{"x":0.33,"y":0.56,"width":0.1,"height":0.12}','/planos/emanuel.s@live.com.ar/bano_1.jpg','/planos/emanuel.s@live.com.ar/bano_1.jpg',8),
('11111111-1111-1111-1111-111111111009','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Baño Secundario','bano-secundario','[{"x":0.34,"y":0.22},{"x":0.45,"y":0.22},{"x":0.45,"y":0.34},{"x":0.34,"y":0.34}]','{"x":0.34,"y":0.22,"width":0.11,"height":0.12}','/planos/emanuel.s@live.com.ar/bano_2.jpg','/planos/emanuel.s@live.com.ar/bano_2.jpg',9)
on conflict (id) do nothing;

insert into devices (id, home_id, room_id, type, name, position, is_on, last_changed_at) values
('22222222-1111-1111-1111-111111111001','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111001','light','Living techo 1','{"x":0.325,"y":0.172}',true, now()),
('22222222-1111-1111-1111-111111111002','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111001','light','Living techo 2','{"x":0.618,"y":0.172}',false, now()),
('22222222-1111-1111-1111-111111111003','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111001','ac','Aire Living','{"x":0.86,"y":0.18}',true, now()),
('22222222-1111-1111-1111-111111111004','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111002','light','Comedor mesa 1','{"x":0.332,"y":0.19}',true, now()),
('22222222-1111-1111-1111-111111111005','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111002','light','Comedor mesa 2','{"x":0.441,"y":0.268}',false, now()),
('22222222-1111-1111-1111-111111111006','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111002','light','Comedor barra','{"x":0.624,"y":0.123}',true, now()),
('22222222-1111-1111-1111-111111111007','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111002','ac','Aire Comedor','{"x":0.82,"y":0.2}',false, now()),
('22222222-1111-1111-1111-111111111008','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111003','light','Cocina central','{"x":0.358,"y":0.385}',true, now()),
('22222222-1111-1111-1111-111111111009','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111004','light','Lavadero techo','{"x":0.456,"y":0.453}',false, now()),
('22222222-1111-1111-1111-111111111010','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111005','light','Pasillo central','{"x":0.423,"y":0.146}',false, now()),
('22222222-1111-1111-1111-111111111011','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111006','light','Habitación Principal techo','{"x":0.409,"y":0.566}',true, now()),
('22222222-1111-1111-1111-111111111012','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111006','ac','Aire Hab. Principal','{"x":0.86,"y":0.46}',false, now()),
('22222222-1111-1111-1111-111111111013','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111007','light','Habitación Secundaria techo','{"x":0.427,"y":0.14}',true, now()),
('22222222-1111-1111-1111-111111111014','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111008','light','Baño Principal','{"x":0.475,"y":0.222}',false, now()),
('22222222-1111-1111-1111-111111111015','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111009','light','Baño Secundario','{"x":0.422,"y":0.248}',false, now())
on conflict (id) do nothing;

insert into room_telemetry (id, room_id, temperature_c, humidity) values
('33333333-1111-1111-1111-111111111001','11111111-1111-1111-1111-111111111001',23.5,48),
('33333333-1111-1111-1111-111111111002','11111111-1111-1111-1111-111111111002',23,50),
('33333333-1111-1111-1111-111111111003','11111111-1111-1111-1111-111111111006',22.5,49),
('33333333-1111-1111-1111-111111111004','11111111-1111-1111-1111-111111111007',22.2,47)
on conflict (id) do nothing;

insert into routines (id, home_id, name, description, status, cadence, next_run_at, last_run_at, actions, sort_order) values
('44444444-1111-1111-1111-111111111001','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Limpieza de pileta','3 veces por día, 30 minutos','active','3x/día 30m',now() + interval '2 hours',now() - interval '6 hours','[{"rooms":["lavadero"],"device_types":["light"],"set_state":true}]',1),
('44444444-1111-1111-1111-111111111002','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Sistema de riego','40 minutos mañana y noche','active','2x/día 40m',now() + interval '10 hours',now() - interval '12 hours','[{"rooms":["pasillo"],"device_types":["light"],"set_state":true}]',2),
('44444444-1111-1111-1111-111111111003','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Luces exteriores','Encender de noche, apagar de día','active','Nocturno',now() + interval '5 hours',now() - interval '12 hours','[{"rooms":["living","comedor"],"device_types":["light"],"set_state":true}]',3),
('44444444-1111-1111-1111-111111111004','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Persianas','Abiertas día, cerradas noche','paused','Diario',now() + interval '1 day',null,'[{"rooms":["living","comedor"],"device_types":["light"],"set_state":false}]',4),
('44444444-1111-1111-1111-111111111005','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Luces en vacaciones','Encendido aleatorio interior','active','Aleatorio',now() + interval '3 hours',now() - interval '1 hour','[{"rooms":["living","comedor","habitacion-principal","habitacion-secundaria"],"device_types":["light"],"set_state":true}]',5),
('44444444-1111-1111-1111-111111111006','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Aires acondicionados','Apagados día, prender 16:30','active','Diario 16:30',now() + interval '4 hours',now() - interval '1 day','[{"rooms":["living","habitacion-principal"],"device_types":["ac"],"set_state":false}]',6)
on conflict (id) do nothing;
