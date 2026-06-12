const app = require('./app');

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // agar bisa diakses dari luar (VPS/Docker)

app.listen(PORT, HOST, () => {
  console.clear();
  console.log('='.repeat(60));
  console.log('🚀 SERVER BERHASIL DIJALANKAN');
  console.log('='.repeat(60));
  console.log(`🌐 URL Local   : http://localhost:${PORT}`);
  console.log(`🌐 URL Network : http://${HOST}:${PORT}`);
  console.log('='.repeat(60));

  console.log('\n🔐 ROLE ACCESS:');
  console.log('  👑 ADMIN  → CRUD Jurusan + CRUD Users');
  console.log('  🧑‍💼 STAFF  → CRUD Mahasiswa + CRUD Nilai + Read Jurusan');

  console.log('\n📌 AVAILABLE ENDPOINTS:\n');

  console.log('🔑 AUTH:');
  console.log('   POST   /auth/login');

  console.log('\n🎓 MAHASISWA (STAFF):');
  console.log('   GET    /mahasiswa');
  console.log('   GET    /mahasiswa/detail?id=1');
  console.log('   GET    /mahasiswa/search?nama=Ahmad');
  console.log('   POST   /mahasiswa');
  console.log('   PUT    /mahasiswa/:id');
  console.log('   DELETE /mahasiswa/:id');

  console.log('\n📊 NILAI (STAFF):');
  console.log('   GET    /nilai?mahasiswa_id=1');
  console.log('   GET    /nilai/all');
  console.log('   POST   /nilai');
  console.log('   PUT    /nilai/:id');
  console.log('   DELETE /nilai/:id');

  console.log('\n🏫 JURUSAN (ADMIN: CRUD | STAFF: Read):');
  console.log('   GET    /jurusan');
  console.log('   GET    /jurusan/detail?id=1');
  console.log('   POST   /jurusan (ADMIN ONLY)');
  console.log('   PUT    /jurusan/:id (ADMIN ONLY)');
  console.log('   DELETE /jurusan/:id (ADMIN ONLY)');

  console.log('\n👥 USERS (ADMIN ONLY):');
  console.log('   GET    /users');
  console.log('   GET    /users/detail?id=1');
  console.log('   POST   /users');
  console.log('   PUT    /users/:id');
  console.log('   DELETE /users/:id');

  console.log('\n' + '='.repeat(60));
});