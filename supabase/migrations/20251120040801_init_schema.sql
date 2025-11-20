-- Tabela de Perfis (Estende a tabela auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  name text,
  role text default 'user',
  avatar_url text,
  created_at timestamptz default now()
);

-- Tabela de Contadores (As configurações do teu app)
create table public.counters (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  title text not null,
  target_date timestamptz not null,
  settings jsonb default '{}'::jsonb, -- Guarda o JSON do Redux aqui!
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Segurança (RLS) - "Quem pode ver o quê?"
alter table public.profiles enable row level security;
alter table public.counters enable row level security;

-- Políticas de Acesso (Policies)

-- Perfis: Todos veem, só o dono edita
create policy "Public profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can insert their own profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Contadores: Só o dono vê e edita
create policy "Individuals can view their own counters" on public.counters
  for select using (auth.uid() = user_id);

create policy "Individuals can insert their own counters" on public.counters
  for insert with check (auth.uid() = user_id);

create policy "Individuals can update their own counters" on public.counters
  for update using (auth.uid() = user_id);

create policy "Individuals can delete their own counters" on public.counters
  for delete using (auth.uid() = user_id);
