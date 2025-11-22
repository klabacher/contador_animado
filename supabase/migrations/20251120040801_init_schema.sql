-- new table for user profiles
create table public.profiles (
  id uuid references auth.users not null primary key,
  name text,
  role text default 'user',
  avatar_url text,
  created_at timestamptz default now()
);

-- new table for counters
create table public.counters (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  status text default 'active' not null,
  title text not null,
  settings jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.counters enable row level security;

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, role)
  values (new.id, new.raw_user_meta_data->>'name', 'user');
  return new;
end;
$$ language plpgsql security definer;
-- production may add "set search_path = public"

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create policy "Public profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Individuals can view their own counters" on public.counters
  for select using (auth.uid() = user_id);

create policy "Individuals can insert their own counters" on public.counters
  for insert with check (auth.uid() = user_id);

create policy "Individuals can update their own counters" on public.counters
  for update using (auth.uid() = user_id);

create policy "Individuals can delete their own counters" on public.counters
  for delete using (auth.uid() = user_id);
