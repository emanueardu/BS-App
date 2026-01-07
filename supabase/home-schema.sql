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
  polygon jsonb not null,
  bbox jsonb,
  plan_asset_url text,
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

-- Row Level Security
alter table homes enable row level security;
alter table rooms enable row level security;
alter table devices enable row level security;
alter table room_telemetry enable row level security;

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
end $$;

-- Seed demo data (replace the user id with the internal/admin user)
-- :OWNER_USER_ID should be replaced by your Supabase auth user id.

insert into homes (id, name, owner_user_id, plan_asset_url)
values (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'Casa Emanuel',
  ':OWNER_USER_ID',
  '/planos/home-plan.jpg'
) on conflict (id) do nothing;

insert into rooms (id, home_id, name, polygon, bbox, sort_order) values
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Living / Comedor','[{"x":0.05,"y":0.05},{"x":0.55,"y":0.05},{"x":0.55,"y":0.38},{"x":0.05,"y":0.38}]','{"x":0.05,"y":0.05,"width":0.5,"height":0.33}',1,'/planos/living.png'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Cocina','[{"x":0.58,"y":0.05},{"x":0.93,"y":0.05},{"x":0.93,"y":0.32},{"x":0.58,"y":0.32}]','{"x":0.58,"y":0.05,"width":0.35,"height":0.27}',2,'/planos/cocina.png'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Dormitorio principal','[{"x":0.05,"y":0.42},{"x":0.42,"y":0.42},{"x":0.42,"y":0.9},{"x":0.05,"y":0.9}]','{"x":0.05,"y":0.42,"width":0.37,"height":0.48}',3,'/planos/habitacion-leon.jpg'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Dormitorio 2 / Oficina','[{"x":0.45,"y":0.45},{"x":0.93,"y":0.45},{"x":0.93,"y":0.9},{"x":0.45,"y":0.9}]','{"x":0.45,"y":0.45,"width":0.48,"height":0.45}',4,'/planos/habitacion-eloy.jpg')
on conflict (id) do nothing;

insert into devices (id, home_id, room_id, type, name, position, is_on) values
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1','light','Luz central','{"x":0.22,"y":0.16}',true),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1','light','Lampara pie','{"x":0.38,"y":0.24}',false),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb3','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1','ac','Aire split','{"x":0.48,"y":0.18}',true),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb4','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2','light','Cielorraso','{"x":0.7,"y":0.16}',true),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb5','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2','ac','Extractor / AC','{"x":0.84,"y":0.18}',false),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb6','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3','light','Cabecera','{"x":0.24,"y":0.64}',false),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb7','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3','light','Velador','{"x":0.28,"y":0.8}',true),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb8','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3','ac','Aire dormitorio','{"x":0.38,"y":0.68}',false),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb9','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4','light','Luz principal','{"x":0.62,"y":0.65}',true),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb10','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4','ac','Aire escritorio','{"x":0.78,"y":0.72}',false)
on conflict (id) do nothing;

insert into room_telemetry (id, room_id, temperature_c, humidity) values
('cccccccc-cccc-cccc-cccc-ccccccccccc1','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',22.5,48),
('cccccccc-cccc-cccc-cccc-ccccccccccc2','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2',24,52),
('cccccccc-cccc-cccc-cccc-ccccccccccc3','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3',21.8,50),
('cccccccc-cccc-cccc-cccc-ccccccccccc4','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4',23.1,46)
on conflict (id) do nothing;
