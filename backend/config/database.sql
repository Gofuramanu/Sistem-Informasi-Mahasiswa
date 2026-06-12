CREATE DATABASE IF NOT EXISTS db_kampus_lab;
USE db_kampus_lab;

DROP TABLE IF EXISTS nilai;
DROP TABLE IF EXISTS mahasiswa;
DROP TABLE IF EXISTS jurusan;
DROP TABLE IF EXISTS users;
CREATE TABLE jurusan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_jurusan VARCHAR(100) NOT NULL,
  fakultas VARCHAR(100) NOT NULL
);

INSERT INTO jurusan (nama_jurusan, fakultas) VALUES
('Teknik Informatika', 'Fakultas Teknik'),
('Sistem Informasi', 'Fakultas Teknik'),
('Teknik Elektro', 'Fakultas Teknik'),
('Manajemen', 'Fakultas Ekonomi dan Bisnis');

CREATE TABLE mahasiswa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  nim VARCHAR(20) NOT NULL UNIQUE,
  jurusan_id INT NOT NULL,
  angkatan INT NOT NULL,
  jenis_kelamin VARCHAR(20) NOT NULL,
  ipk DECIMAL(3,2) NOT NULL,
  alamat TEXT,
  email VARCHAR(100),
  no_hp VARCHAR(20),
  FOREIGN KEY (jurusan_id) REFERENCES jurusan(id)
);

INSERT INTO mahasiswa (nama, nim, jurusan_id, angkatan, jenis_kelamin, ipk, alamat, email, no_hp) VALUES
('Ahmad Fauzi', '2101001', 1, 2021, 'Laki-laki', 3.75, 'Jl. Sudirman No. 123, Jakarta', 'ahmad.fauzi@student.ac.id', '081234567801'),
('Siti Nurhaliza', '2101002', 1, 2021, 'Perempuan', 3.85, 'Jl. Gatot Subroto No. 45, Jakarta', 'siti.nurhaliza@student.ac.id', '081234567802'),
('Budi Santoso', '2101003', 1, 2021, 'Laki-laki', 3.50, 'Jl. Thamrin No. 67, Jakarta', 'budi.santoso@student.ac.id', '081234567803'),
('Dewi Anggraini', '2101004', 2, 2021, 'Perempuan', 3.90, 'Jl. Diponegoro No. 89, Bandung', 'dewi.anggraini@student.ac.id', '081234567804'),
('Eko Prasetyo', '2101005', 2, 2021, 'Laki-laki', 3.65, 'Jl. Ahmad Yani No. 12, Bandung', 'eko.prasetyo@student.ac.id', '081234567805'),
('Fitri Handayani', '2102006', 1, 2022, 'Perempuan', 3.80, 'Jl. Pemuda No. 34, Semarang', 'fitri.handayani@student.ac.id', '081234567806'),
('Galih Saputra', '2102007', 1, 2022, 'Laki-laki', 3.55, 'Jl. Pahlawan No. 56, Semarang', 'galih.saputra@student.ac.id', '081234567807'),
('Hani Wijaya', '2102008', 3, 2022, 'Perempuan', 3.70, 'Jl. Veteran No. 78, Surabaya', 'hani.wijaya@student.ac.id', '081234567808'),
('Irfan Hakim', '2102009', 3, 2022, 'Laki-laki', 3.60, 'Jl. Basuki Rahmat No. 90, Surabaya', 'irfan.hakim@student.ac.id', '081234567809'),
('Joko Widodo', '2102010', 4, 2022, 'Laki-laki', 3.45, 'Jl. Gajah Mada No. 11, Yogyakarta', 'joko.widodo@student.ac.id', '081234567810'),
('Kartika Sari', '2103011', 1, 2023, 'Perempuan', 3.95, 'Jl. Malioboro No. 22, Yogyakarta', 'kartika.sari@student.ac.id', '081234567811'),
('Lukman Hakim', '2103012', 2, 2023, 'Laki-laki', 3.75, 'Jl. Kusumanegara No. 33, Solo', 'lukman.hakim@student.ac.id', '081234567812'),
('Maya Septiani', '2103013', 2, 2023, 'Perempuan', 3.88, 'Jl. Dr. Radjiman No. 44, Solo', 'maya.septiani@student.ac.id', '081234567813'),
('Nanda Pratama', '2103014', 3, 2023, 'Laki-laki', 3.52, 'Jl. Imam Bonjol No. 55, Medan', 'nanda.pratama@student.ac.id', '081234567814'),
('Olivia Lestari', '2103015', 4, 2023, 'Perempuan', 3.67, 'Jl. Sisingamangaraja No. 66, Medan', 'olivia.lestari@student.ac.id', '081234567815'),
('Putra Ramadhan', '2104016', 1, 2024, 'Laki-laki', 3.78, 'Jl. Asia Afrika No. 77, Makassar', 'putra.ramadhan@student.ac.id', '081234567816'),
('Qonita Rahma', '2104017', 1, 2024, 'Perempuan', 3.82, 'Jl. Pettarani No. 88, Makassar', 'qonita.rahma@student.ac.id', '081234567817'),
('Rizki Firmansyah', '2104018', 2, 2024, 'Laki-laki', 3.58, 'Jl. Raya Puputan No. 99, Denpasar', 'rizki.firmansyah@student.ac.id', '081234567818'),
('Sari Wulandari', '2104019', 3, 2024, 'Perempuan', 3.72, 'Jl. Sunset Road No. 100, Denpasar', 'sari.wulandari@student.ac.id', '081234567819'),
('Teguh Susanto', '2104020', 4, 2024, 'Laki-laki', 3.48, 'Jl. Supratman No. 111, Balikpapan', 'teguh.susanto@student.ac.id', '081234567820');

CREATE TABLE nilai (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mahasiswa_id INT NOT NULL,
  mata_kuliah VARCHAR(100) NOT NULL,
  nilai CHAR(2) NOT NULL,
  FOREIGN KEY (mahasiswa_id) REFERENCES mahasiswa(id)
);

INSERT INTO nilai (mahasiswa_id, mata_kuliah, nilai) VALUES
(1, 'Algoritma dan Pemrograman', 'A'),
(1, 'Basis Data', 'A-'),
(1, 'Jaringan Komputer', 'B+'),
(2, 'Algoritma dan Pemrograman', 'A'),
(2, 'Basis Data', 'A'),
(2, 'Pemrograman Web', 'A-'),
(3, 'Algoritma dan Pemrograman', 'B+'),
(3, 'Basis Data', 'B'),
(3, 'Sistem Operasi', 'B+'),
(4, 'Sistem Informasi Manajemen', 'A'),
(4, 'Analisis dan Desain Sistem', 'A'),
(4, 'Basis Data', 'A-'),
(5, 'Sistem Informasi Manajemen', 'A-'),
(5, 'E-Business', 'B+'),
(5, 'Basis Data', 'A-'),
(6, 'Algoritma dan Pemrograman', 'A-'),
(6, 'Struktur Data', 'A-'),
(6, 'Basis Data', 'B+'),
(7, 'Algoritma dan Pemrograman', 'B+'),
(7, 'Matematika Diskrit', 'B'),
(8, 'Rangkaian Listrik', 'A-'),
(8, 'Elektronika Dasar', 'B+'),
(8, 'Fisika Teknik', 'A-'),
(9, 'Rangkaian Listrik', 'B+'),
(9, 'Sistem Digital', 'B'),
(10, 'Pengantar Manajemen', 'B'),
(10, 'Ekonomi Mikro', 'B+'),
(10, 'Akuntansi Dasar', 'B'),
(11, 'Algoritma dan Pemrograman', 'A'),
(11, 'Basis Data', 'A'),
(11, 'Pemrograman Berorientasi Objek', 'A');

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL,
  nama_lengkap VARCHAR(100),
  email VARCHAR(100)
);

INSERT INTO users (username, password, role, nama_lengkap, email) VALUES
('admin', '0192023a7bbd73250516f069df18b500', 'admin', 'Administrator', 'admin@kampus.ac.id'),
('staff', 'de9bf5643eabf80f4a56fda3bbb84483', 'staff', 'Staff Akademik', 'staff@kampus.ac.id');

SELECT 'Database setup complete!' as status;
SELECT COUNT(*) as jurusan_count FROM jurusan;
SELECT COUNT(*) as mahasiswa_count FROM mahasiswa;
SELECT COUNT(*) as nilai_count FROM nilai;
SELECT COUNT(*) as users_count FROM users;
