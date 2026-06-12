const express = require('express');
const cors = require('cors');

const mahasiswaRoutes = require('./routes/mahasiswaRoutes');
const authRoutes = require('./routes/authRoutes');
const nilaiRoutes = require('./routes/nilaiRoutes');
const jurusanRoutes = require('./routes/jurusanRoutes');
const usersRoutes = require('./routes/usersRoutes');

const app = express();

console.log('WARNING: SQL INJECTION LAB ENVIRONMENT');
console.log('This application is DELIBERATELY VULNERABLE');
console.log('DO NOT use this in production!');
console.log('');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/mahasiswa', mahasiswaRoutes);
app.use('/auth', authRoutes);
app.use('/nilai', nilaiRoutes);
app.use('/jurusan', jurusanRoutes);
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Kampus Advanced Lab - SQL Injection Demo',
    warning: 'VULNERABLE APPLICATION - For Educational Purposes Only',
    roleAccess: {
      admin: 'CRUD Jurusan + CRUD Users',
      staff: 'CRUD Mahasiswa + CRUD Nilai + Read Jurusan'
    },
    endpoints: {
      auth: {
        login: 'POST /auth/login (VULNERABLE)'
      },
      mahasiswa: {
        access: 'STAFF ONLY',
        getAll: 'GET /mahasiswa',
        detail: 'GET /mahasiswa/detail?id=1 (VULNERABLE)',
        search: 'GET /mahasiswa/search?nama=Ahmad (VULNERABLE)',
        create: 'POST /mahasiswa (VULNERABLE)',
        update: 'PUT /mahasiswa/:id (VULNERABLE)',
        delete: 'DELETE /mahasiswa/:id (VULNERABLE)'
      },
      nilai: {
        access: 'STAFF ONLY',
        getByMahasiswa: 'GET /nilai?mahasiswa_id=1 (VULNERABLE)',
        getAll: 'GET /nilai/all',
        create: 'POST /nilai (VULNERABLE)',
        update: 'PUT /nilai/:id (VULNERABLE)',
        delete: 'DELETE /nilai/:id (VULNERABLE)'
      },
      jurusan: {
        access: 'ADMIN: CRUD | STAFF: Read Only',
        getAll: 'GET /jurusan',
        detail: 'GET /jurusan/detail?id=1 (VULNERABLE)',
        create: 'POST /jurusan (VULNERABLE - ADMIN ONLY)',
        update: 'PUT /jurusan/:id (VULNERABLE - ADMIN ONLY)',
        delete: 'DELETE /jurusan/:id (VULNERABLE - ADMIN ONLY)'
      },
      users: {
        access: 'ADMIN ONLY',
        getAll: 'GET /users',
        detail: 'GET /users/detail?id=1 (VULNERABLE)',
        create: 'POST /users (VULNERABLE)',
        update: 'PUT /users/:id (VULNERABLE)',
        delete: 'DELETE /users/:id (VULNERABLE)'
      }
    },
    vulnerabilities: [
      'Boolean-based SQL Injection',
      'UNION-based SQL Injection',
      'Error-based SQL Injection',
      'INSERT-based SQL Injection',
      'UPDATE-based SQL Injection',
      'DELETE-based SQL Injection',
      'Authentication Bypass',
      'Data Extraction',
      'Second-order SQL Injection'
    ]
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

module.exports = app;
