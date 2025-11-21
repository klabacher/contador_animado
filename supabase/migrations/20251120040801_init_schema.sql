-- Tabela de Perfis (Estende a tabela auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  name text,
  role text default 'user',
  avatar_url text,
  created_at timestamptz default now()
);

-- Tabela de Contadores
create table public.counters (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  title text not null,
  target_date timestamptz not null,
  settings jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Habilitar RLS
alter table public.profiles enable row level security;
alter table public.counters enable row level security;

-- --- TRIGGER (O jeito automático) ---
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, role)
  values (new.id, new.raw_user_meta_data->>'name', 'user');
  return new;
end;
$$ language plpgsql security definer; 
-- Dica de Segurança: Em produção, é bom adicionar "set search_path = public" aqui em cima ^

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user(); -- Postgres 11+ usa FUNCTION

-- --- POLICIES (As regras do jogo) ---

-- Perfis: Todos veem, só o dono edita.
-- REMOVIDO: Policy de INSERT (O trigger já faz isso!)
create policy "Public profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Contadores: Tudo normal aqui
create policy "Individuals can view their own counters" on public.counters
  for select using (auth.uid() = user_id);

create policy "Individuals can insert their own counters" on public.counters
  for insert with check (auth.uid() = user_id);

create policy "Individuals can update their own counters" on public.counters
  for update using (auth.uid() = user_id);

create policy "Individuals can delete their own counters" on public.counters
  for delete using (auth.uid() = user_id);