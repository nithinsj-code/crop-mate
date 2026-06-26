-- Run this in the Supabase SQL Editor

-- 1. Create the farms table
create table public.farms (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    name text not null,
    location jsonb not null,
    size numeric not null,
    soil_type text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create the activities table
create table public.activities (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    farm_id uuid references public.farms(id) on delete cascade not null,
    date date not null,
    type text not null,
    description text,
    cost numeric default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create the expenses table
create table public.expenses (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    farm_id uuid references public.farms(id) on delete cascade not null,
    date date not null,
    category text not null,
    amount numeric not null,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable Row Level Security (RLS)
alter table public.farms enable row level security;
alter table public.activities enable row level security;
alter table public.expenses enable row level security;

-- 5. Create RLS Policies so users can only access their own data
-- Farms policies
create policy "Users can view their own farms" on public.farms for select using (auth.uid() = user_id);
create policy "Users can insert their own farms" on public.farms for insert with check (auth.uid() = user_id);
create policy "Users can update their own farms" on public.farms for update using (auth.uid() = user_id);
create policy "Users can delete their own farms" on public.farms for delete using (auth.uid() = user_id);

-- Activities policies
create policy "Users can view their own activities" on public.activities for select using (auth.uid() = user_id);
create policy "Users can insert their own activities" on public.activities for insert with check (auth.uid() = user_id);
create policy "Users can update their own activities" on public.activities for update using (auth.uid() = user_id);
create policy "Users can delete their own activities" on public.activities for delete using (auth.uid() = user_id);

-- Expenses policies
create policy "Users can view their own expenses" on public.expenses for select using (auth.uid() = user_id);
create policy "Users can insert their own expenses" on public.expenses for insert with check (auth.uid() = user_id);
create policy "Users can update their own expenses" on public.expenses for update using (auth.uid() = user_id);
create policy "Users can delete their own expenses" on public.expenses for delete using (auth.uid() = user_id);
