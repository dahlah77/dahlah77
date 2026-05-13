create extension if not exists pgcrypto;

create type app_role as enum ('customer','driver','merchant','admin','super_admin');
create type verification_status as enum ('pending','verified','rejected','suspended');
create type service_type as enum ('ride','food','send','companion');
create type order_status as enum ('pending','searching_driver','driver_assigned','driver_to_pickup','arrived_at_pickup','picked_up','in_progress','preparing_food','ready_for_pickup','delivered','completed','cancelled','disputed');

create table profiles (
  id uuid primary key references auth.users(id), full_name text not null, phone text not null, avatar_url text,
  role app_role not null default 'customer', birth_date date, emergency_contact_name text, emergency_contact_phone text,
  is_active boolean default true, created_at timestamptz default now(), updated_at timestamptz default now());
create table drivers (id uuid primary key default gen_random_uuid(), profile_id uuid not null references profiles(id), full_name text not null, phone text not null, birth_date date not null, age_verified boolean default false, verification_status verification_status default 'pending', is_online boolean default false, created_at timestamptz default now(), updated_at timestamptz default now());
create table restaurants (id uuid primary key default gen_random_uuid(), owner_profile_id uuid not null references profiles(id), name text not null, description text, phone text, address_text text not null, is_open boolean default false, verification_status verification_status default 'pending', created_at timestamptz default now(), updated_at timestamptz default now());
create table menu_items (id uuid primary key default gen_random_uuid(), restaurant_id uuid references restaurants(id), name text not null, price numeric not null, is_available boolean default true, created_at timestamptz default now(), updated_at timestamptz default now());
create table pricing_rules (id uuid primary key default gen_random_uuid(), service_type service_type not null unique, base_fare numeric not null, per_km_fare numeric not null, service_fee numeric not null, minimum_fare numeric not null, platform_commission_percent numeric not null, is_active boolean default true, created_at timestamptz default now(), updated_at timestamptz default now());
create table orders (id uuid primary key default gen_random_uuid(), order_code text unique not null, customer_id uuid not null references profiles(id), driver_id uuid references drivers(id), restaurant_id uuid references restaurants(id), service_type service_type not null, status order_status not null default 'pending', pickup_address text not null, destination_address text, distance_km numeric default 0, duration_minutes int default 0, notes text, base_fare numeric not null default 0, distance_fare numeric not null default 0, service_fee numeric not null default 0, companion_fee numeric not null default 0, total_price numeric not null default 0, payment_method text not null default 'cash', payment_status text not null default 'unpaid', created_at timestamptz default now(), updated_at timestamptz default now());
create table order_status_logs (id uuid primary key default gen_random_uuid(), order_id uuid not null references orders(id), old_status text, new_status text not null, changed_by uuid references profiles(id), created_at timestamptz default now());
create table chat_messages (id uuid primary key default gen_random_uuid(), order_id uuid not null references orders(id), sender_id uuid not null references profiles(id), message text not null, created_at timestamptz default now());
create table complaints (id uuid primary key default gen_random_uuid(), order_id uuid references orders(id), reporter_id uuid not null references profiles(id), category text not null, description text not null, status text default 'open', priority text default 'normal', created_at timestamptz default now(), updated_at timestamptz default now());
create table ratings (id uuid primary key default gen_random_uuid(), order_id uuid not null references orders(id), rater_id uuid not null references profiles(id), rating int check (rating between 1 and 5), review text, created_at timestamptz default now());

alter table profiles enable row level security;
create policy "own_profile" on profiles for all using (auth.uid() = id);

insert into pricing_rules(service_type,base_fare,per_km_fare,service_fee,minimum_fare,platform_commission_percent) values
('ride',5000,2500,1000,8000,15),('food',5000,2000,2000,8000,10),('send',6000,2500,2000,10000,15),('companion',0,0,5000,35000,20);
