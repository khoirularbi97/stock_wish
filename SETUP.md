# Setup Panduan - Stock Analyzer

Panduan lengkap untuk mengatur aplikasi Stock Analyzer di environment lokal Anda.

## Masalah "Gagal Login" / "Failed to Fetch"

Jika Anda mengalami error "Failed to fetch" atau "Gagal login", ini biasanya disebabkan oleh salah satu dari masalah berikut:

### 1. Supabase Belum Dikonfigurasi

**Gejala:** Error "Failed to fetch" atau "Tidak dapat terhubung ke server"

**Solusi:**
1. Buat project Supabase baru di [supabase.com](https://supabase.com)
2. Salin file `.env.example` ke `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Update `.env.local` dengan kredensial Supabase Anda:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```
4. Restart development server:
   ```bash
   npm run dev
   ```

### 2. Database Migrations Belum Dijalankan

**Gejala:** Login form bisa diakses, tapi kredensial demo tidak bekerja

**Solusi:**
1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```
2. Link ke project Supabase Anda:
   ```bash
   supabase link --project-ref your-project-ref
   ```
3. Jalankan migrations:
   ```bash
   supabase db push
   ```
   
   Atau, jika menggunakan Supabase Dashboard:
   - Buka Supabase Dashboard > SQL Editor
   - Jalankan file migrations dari folder `supabase/migrations/`
   - Mulai dengan `20251220234943_stock_selection_complete_schema.sql`

### 3. URL Supabase Tidak Valid

**Gejala:** Error "Could not resolve host" atau DNS resolution error

**Solusi:**
1. Cek apakah project Supabase masih aktif di [app.supabase.com](https://app.supabase.com)
2. Verifikasi URL dan API key di Project Settings > API
3. Pastikan project tidak di-pause (free tier Supabase pause setelah 1 minggu tidak digunakan)
4. Update `.env.local` dengan kredensial yang benar

### 4. Environment Variables Tidak Ter-load

**Gejala:** App berjalan tapi tidak bisa koneksi ke Supabase

**Solusi:**
1. Pastikan file `.env.local` ada di root folder project
2. Restart development server setelah mengubah environment variables
3. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

## Cara Mendapatkan Supabase Credentials

1. Login ke [supabase.com](https://supabase.com)
2. Buat project baru atau pilih project yang sudah ada
3. Buka **Project Settings** (icon gear di sidebar kiri bawah)
4. Pilih **API** dari menu
5. Salin nilai berikut:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Testing Login Setelah Setup

Setelah setup selesai, coba login dengan demo credentials:

**Investor Account:**
- Email: `investor@example.com`
- Password: `investor123`

**Analyst Account:**
- Email: `analyst@example.com`
- Password: `analyst123`

## Troubleshooting Lainnya

### Port 4028 Sudah Digunakan

Jika mendapat error "Port 4028 is already in use":
```bash
# Kill process yang menggunakan port
lsof -ti:4028 | xargs kill -9

# Atau gunakan port lain
npm run dev -- -p 3000
```

### TypeScript Errors

Jika mendapat TypeScript errors saat build:
```bash
# Generate types dari Supabase
supabase gen types typescript --project-id your-project-ref > src/types/database.types.ts
```

## Butuh Bantuan?

Jika masih mengalami masalah:
1. Cek [Issues](https://github.com/khoirularbi97/stock_wish/issues) untuk masalah serupa
2. Buat issue baru dengan detail error message dan langkah reproduksi
3. Sertakan screenshot jika memungkinkan

## Referensi

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
