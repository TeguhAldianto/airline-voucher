# Airline Voucher Seat Assignment Application

Aplikasi web Voucher Seat Assignment yang dibangun untuk kampanye promosi maskapai penerbangan. Aplikasi ini memungkinkan awak kabin untuk memasukkan detail penerbangan dan menghasilkan 3 kursi unik secara acak berdasarkan tata letak pesawat tertentu.

## Objektif Project
1. Memasukkan detail awak kabin (Nama & ID) dan detail penerbangan.
2. Menghasilkan tepat 3 kursi acak yang unik (non-repeating) sesuai tipe pesawat:
   - **ATR**: Baris 1-18, Kursi: A, C, D, F (Tanpa B dan E).
   - **Airbus 320**: Baris 1-32, Kursi: A, B, C, D, E, F.
   - **Boeing 737 Max**: Baris 1-32, Kursi: A, B, C, D, E, F.
3. Mencegah pembuatan voucher ganda untuk nomor penerbangan yang sama pada tanggal yang sama.
4. Menyimpan data penugasan ke database MySQL menggunakan Eloquent ORM.

## Tech Stack
- **Backend**: PHP 8.2+ & Laravel 12 (Latest)
- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Database**: MySQL

## Prasyarat (Prerequisites)
Pastikan perangkat Anda sudah terinstal:
- PHP 8.2 atau lebih tinggi
- Composer
- Node.js & NPM
- MySQL Server

## Langkah Instalasi

### 1. Clone dan Install Dependency
Buka terminal dan jalankan perintah berikut:
```bash
# Masuk ke folder project
cd airline-voucher

# Install dependency Laravel
composer install

# Install dependency Frontend
npm install

```

### 2. Konfigurasi Environment

Salin file `.env.example` menjadi `.env` dan konfigurasikan koneksi database MySQL Anda:

```bash
cp .env.example .env
php artisan key:generate

```

Edit bagian berikut di `.env`:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=airline_voucher
DB_USERNAME=root
DB_PASSWORD=

```

### 3. Migrasi Database

Buat database bernama `airline_voucher` di MySQL Anda, lalu jalankan migrasi:

```bash
php artisan migrate

```

## Cara Menjalankan Aplikasi

Anda harus menjalankan dua terminal secara bersamaan:

**Terminal 1 (Backend Server):**

```bash
php artisan serve

```

Aplikasi akan tersedia di `http://127.0.0.1:8000`.

**Terminal 2 (Frontend Compiler):**

```bash
npm run dev

```

## API Endpoints

Aplikasi ini menyediakan API sesuai spesifikasi:

* `POST /api/check`: Memvalidasi apakah voucher sudah ada untuk penerbangan dan tanggal tertentu.
* `POST /api/generate`: Membuat data voucher baru dan menghasilkan 3 kursi acak.

## Bonus Features & Best Practices

* **Separation of Logic**: Menggunakan `SeatGeneratorService` untuk menangani logika pembuatan kursi (Clean Code).
* **API Resources**: Menggunakan Laravel API Resources untuk format response JSON yang konsisten.
* **Form Requests**: Validasi input menggunakan class request khusus.
* **Automated Testing**: Tersedia Feature Test untuk memastikan stabilitas API.

## Menjalankan Test

Untuk menjalankan automated testing (Feature Tests):

```bash
php artisan test
