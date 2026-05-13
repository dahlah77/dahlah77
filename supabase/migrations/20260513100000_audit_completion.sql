-- Audit completion migration: menutup gap tabel/fitur utama OJP
create table if not exists addresses (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references profiles(id), label text not null,
  address_text text not null, latitude numeric, longitude numeric, notes text, is_default boolean default false, created_at timestamptz default now());
create table if not exists driver_documents (
  id uuid primary key default gen_random_uuid(), driver_id uuid not null references drivers(id), document_type text not null,
  file_url text not null, status text not null default 'pending', notes text, created_at timestamptz default now());
create table if not exists driver_services (
  id uuid primary key default gen_random_uuid(), driver_id uuid not null references drivers(id), service_type service_type not null,
  is_enabled boolean default false, admin_approved boolean default false, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists companion_profiles (
  id uuid primary key default gen_random_uuid(), driver_id uuid not null references drivers(id), display_name text not null,
  bio text, allowed_activities jsonb default '[]'::jsonb, hourly_rate numeric default 35000, minimum_duration_minutes int default 60,
  is_visible boolean default false, safety_acknowledged boolean default false, admin_approved boolean default false, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists menu_categories (
  id uuid primary key default gen_random_uuid(), restaurant_id uuid not null references restaurants(id), name text not null, sort_order int default 0, created_at timestamptz default now());
create table if not exists food_order_items (
  id uuid primary key default gen_random_uuid(), order_id uuid not null references orders(id), menu_item_id uuid references menu_items(id),
  item_name_snapshot text not null, price_snapshot numeric not null, quantity int not null, notes text, subtotal numeric not null, created_at timestamptz default now());
create table if not exists send_packages (
  id uuid primary key default gen_random_uuid(), order_id uuid not null references orders(id), package_type text, package_description text,
  recipient_name text, recipient_phone text, proof_photo_url text, pickup_code text, delivery_code text, created_at timestamptz default now());
create table if not exists companion_bookings (
  id uuid primary key default gen_random_uuid(), order_id uuid not null references orders(id), companion_driver_id uuid not null references drivers(id),
  activity_type text not null, activity_description text, meeting_place_type text default 'public_place', duration_minutes int not null,
  user_age_confirmed boolean default false, driver_age_confirmed boolean default false, code_of_conduct_accepted boolean default false, safety_share_required boolean default true,
  created_at timestamptz default now());
create table if not exists payments (
  id uuid primary key default gen_random_uuid(), order_id uuid not null references orders(id), amount numeric not null, method text not null,
  status text not null default 'unpaid', proof_url text, paid_at timestamptz, created_at timestamptz default now());
create table if not exists service_areas (
  id uuid primary key default gen_random_uuid(), name text not null, city text default 'Pelaihari', province text default 'Kalimantan Selatan',
  center_latitude numeric, center_longitude numeric, radius_km numeric default 15, is_active boolean default true, created_at timestamptz default now());
create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(), actor_id uuid references profiles(id), action text not null, entity_type text not null, entity_id uuid,
  metadata jsonb default '{}'::jsonb, created_at timestamptz default now());
create table if not exists app_settings (
  id uuid primary key default gen_random_uuid(), key text unique not null, value jsonb not null, updated_at timestamptz default now());

insert into app_settings(key,value) values
('platform_name','"Ojek Pelaihari"'::jsonb),('admin_whatsapp','"6280000000000"'::jsonb),('emergency_whatsapp','"6281111111111"'::jsonb),('service_area_radius','15'::jsonb),('maintenance_mode','false'::jsonb),('companion_feature_enabled','true'::jsonb)
on conflict (key) do nothing;

insert into service_areas(name,center_latitude,center_longitude,radius_km) values
('Pelaihari Kota',-3.7992,114.7675,15) on conflict do nothing;
