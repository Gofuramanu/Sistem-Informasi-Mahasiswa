const db = require('../config/db');

const getAllMahasiswa = (req, res) => {
  const query = `
    SELECT 
      mahasiswa.*,
      jurusan.nama_jurusan,
      jurusan.fakultas
    FROM mahasiswa
    LEFT JOIN jurusan ON mahasiswa.jurusan_id = jurusan.id
    ORDER BY mahasiswa.id
  `;
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json(results);
  });
};

const getMahasiswaDetail = (req, res) => {
  const id = req.query.id;
  const query = `SELECT * FROM mahasiswa WHERE id = '${id}'`;
  
  console.log('Executing vulnerable query:', query);
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json(results);
  });
};

const searchMahasiswa = (req, res) => {
  const nama = req.query.nama;
  const query = `SELECT * FROM mahasiswa WHERE nama LIKE '%${nama}%'`;
  
  console.log('Executing vulnerable query:', query);
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json(results);
  });
};

const createMahasiswa = (req, res) => {
  const { nama, nim, jurusan_id, angkatan, jenis_kelamin, ipk, alamat, email, no_hp } = req.body;
  const query = `INSERT INTO mahasiswa (nama, nim, jurusan_id, angkatan, jenis_kelamin, ipk, alamat, email, no_hp) 
                 VALUES ('${nama}', '${nim}', '${jurusan_id}', '${angkatan}', '${jenis_kelamin}', '${ipk}', '${alamat}', '${email}', '${no_hp}')`;
  
  console.log('Executing vulnerable INSERT query:', query);
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json({
      message: 'Mahasiswa berhasil ditambahkan',
      id: results.insertId
    });
  });
};

const updateMahasiswa = (req, res) => {
  const id = req.params.id;
  const { nama, nim, jurusan_id, angkatan, jenis_kelamin, ipk, alamat, email, no_hp } = req.body;
  const query = `UPDATE mahasiswa 
                 SET nama = '${nama}', 
                     nim = '${nim}', 
                     jurusan_id = '${jurusan_id}', 
                     angkatan = '${angkatan}', 
                     jenis_kelamin = '${jenis_kelamin}', 
                     ipk = '${ipk}', 
                     alamat = '${alamat}', 
                     email = '${email}', 
                     no_hp = '${no_hp}' 
                 WHERE id = '${id}'`;
  
  console.log('Executing vulnerable UPDATE query:', query);
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json({
      message: 'Mahasiswa berhasil diupdate',
      affectedRows: results.affectedRows
    });
  });
};

const deleteMahasiswa = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM mahasiswa WHERE id = '${id}'`;
  
  console.log('Executing vulnerable DELETE query:', query);
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json({
      message: 'Mahasiswa berhasil dihapus',
      affectedRows: results.affectedRows
    });
  });
};

module.exports = {
  getAllMahasiswa,
  getMahasiswaDetail,
  searchMahasiswa,
  createMahasiswa,
  updateMahasiswa,
  deleteMahasiswa
};
