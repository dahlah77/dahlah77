# Ojek Pelaihari (OJP)

Aplikasi web/PWA full-stack awal untuk layanan OJP.

## Menjalankan

```bash
npm install
npm run dev
```

## Catatan logo

Simpan logo upload pengguna sebagai `public/ojp-logo.png` agar tampil pada navbar, hero, login, dashboard, footer, dan icon manifest.

## Supabase

- Migration awal: `supabase/migrations/20260510180000_init_ojp.sql`
- Berisi schema inti, enum, tabel order, pricing, chat, complaint, rating, dan policy RLS dasar.
