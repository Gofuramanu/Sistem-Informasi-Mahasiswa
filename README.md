# Sistem Informasi Mahasiswa

Aplikasi web untuk menampilkan informasi mahasiswa dengan fitur:
- **Public Access**: Semua orang bisa melihat data mahasiswa tanpa login
- **Admin Access**: Admin harus login untuk CRUD data mahasiswa

## 🚀 Cara Menjalankan Aplikasi

### 1. Jalankan Backend (Port 5000)
```bash
cd kampus-advanced-lab/backend
npm install
npm start
```

### 2. Jalankan Frontend (Port 3000)
```bash
cd kampus-advanced-lab/frontend
npm install
npm start
```

### 3. Akses Aplikasi
- **Public Website**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login

## 👤 Akun Login Admin

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | Admin |
| staff | staff123 | Staff |

## 📱 Fitur Aplikasi

### Public (Tanpa Login)
✅ Lihat daftar semua mahasiswa
✅ Cari mahasiswa by nama/NIM
✅ Filter by jurusan dan angkatan
✅ Lihat detail mahasiswa
✅ Pagination

### Admin (Harus Login)
✅ Dashboard dengan statistik
✅ **CREATE** - Tambah mahasiswa baru
✅ **READ** - Lihat semua data mahasiswa
✅ **UPDATE** - Edit data mahasiswa
✅ **DELETE** - Hapus data mahasiswa
✅ Logout

## 🗂️ Struktur Route

### Public Routes (No Auth Required)
- `/` - Home/Landing page
- `/mahasiswa` - Daftar mahasiswa (public view)
- `/mahasiswa/detail/:id` - Detail mahasiswa

### Admin Routes (Auth Required)
- `/admin/login` - Login page
- `/admin/dashboard` - Dashboard admin
- `/admin/mahasiswa` - Kelola data mahasiswa
- `/admin/mahasiswa/tambah` - Form tambah mahasiswa
- `/admin/mahasiswa/edit/:id` - Form edit mahasiswa
- `/admin/mahasiswa/detail/:id` - Detail mahasiswa (admin view)

## 🛠️ Teknologi

### Frontend
- React 18
- Material-UI (Argon Dashboard)
- React Router v6
- Axios
- Context API (Authentication)

### Backend
- Node.js + Express
- MySQL
- bcrypt
- CORS

## 📊 Database

Database: `db_kampus_lab`

Tables:
- `users` - Data user admin/staff
- `mahasiswa` - Data mahasiswa (20 records)
- `jurusan` - Data jurusan (4 records)
- `nilai` - Data nilai mahasiswa

## ⚠️ Catatan Keamanan

**WARNING**: Backend sengaja vulnerable (SQL Injection) untuk tujuan edukasi penetration testing.

**JANGAN GUNAKAN DI PRODUCTION!**

## 🎯 Flow Penggunaan

### Pengunjung (Public)
1. Buka http://localhost:3000
2. Klik "Daftar Mahasiswa"
3. Lihat, cari, filter data mahasiswa
4. Klik "Detail" untuk melihat informasi lengkap
5. Tidak bisa edit/hapus apapun

### Admin
1. Buka http://localhost:3000/admin/login
2. Login dengan username: `admin` password: `admin123`
3. Masuk ke Dashboard
4. Klik "Data Mahasiswa" untuk CRUD
5. Tambah/Edit/Hapus mahasiswa
6. Logout saat selesai

## 📝 Validasi Form

Form mahasiswa memiliki validasi:
- Nama, NIM, Jurusan, Angkatan, Jenis Kelamin, IPK (Required)
- IPK harus 0.00 - 4.00
- Email format email
- Angkatan berupa angka tahun

## 🎨 Fitur UI

- Responsive design (mobile-friendly)
- Modern & clean interface
- Search & filter real-time
- Pagination
- Color-coded IPK chips
- Confirmation dialog untuk delete
- Loading states
- Error handling

---

**Developed for Educational Purposes** 🎓
