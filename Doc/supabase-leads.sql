-- ============================================================
-- Tabla `leads` para captura de formulario de la landing GANIA
-- Ejecutar en el SQL Editor de Supabase
-- ============================================================

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text,
  email       text,
  whatsapp    text,
  city        text,
  occupation  text,
  interest    text,
  source      text default 'web_landing',
  user_agent  text,
  page_url    text,
  contacted   boolean not null default false,
  notes       text
);

-- Índices útiles para búsquedas
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx       on public.leads (email);

-- Activar Row Level Security
alter table public.leads enable row level security;

-- Permitir SOLO INSERT a usuarios anónimos (clave pública del front).
-- Nadie podrá hacer SELECT/UPDATE/DELETE desde el cliente.
drop policy if exists "leads_insert_anon" on public.leads;
create policy "leads_insert_anon"
  on public.leads
  for insert
  to anon
  with check (true);

-- (Opcional) Permitir lectura solo a usuarios autenticados (panel admin).
drop policy if exists "leads_select_authenticated" on public.leads;
create policy "leads_select_authenticated"
  on public.leads
  for select
  to authenticated
  using (true);
