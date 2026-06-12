const db = require('../config/db');

const getNilaiByMahasiswa = (req, res) => {
  const mahasiswa_id = req.query.mahasiswa_id;
  const query = `SELECT * FROM nilai WHERE mahasiswa_id = '${mahasiswa_id}'`;
  
  console.log('Executing vulnerable query:', query);
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json(results);
  });
};

const getAllNilai = (req, res) => {
  const query = `SELECT * FROM nilai ORDER BY id`;
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json(results);
  });
};

const createNilai = (req, res) => {
  const { mahasiswa_id, mata_kuliah, nilai } = req.body;
  const query = `INSERT INTO nilai (mahasiswa_id, mata_kuliah, nilai) 
                 VALUES ('${mahasiswa_id}', '${mata_kuliah}', '${nilai}')`;
  
  console.log('Executing vulnerable INSERT query:', query);
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json({
      message: 'Nilai berhasil ditambahkan',
      id: results.insertId
    });
  });
};

const updateNilai = (req, res) => {
  const id = req.params.id;
  const { mahasiswa_id, mata_kuliah, nilai } = req.body;
  const query = `UPDATE nilai 
                 SET mahasiswa_id = '${mahasiswa_id}', 
                     mata_kuliah = '${mata_kuliah}', 
                     nilai = '${nilai}' 
                 WHERE id = '${id}'`;
  
  console.log('Executing vulnerable UPDATE query:', query);
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json({
      message: 'Nilai berhasil diupdate',
      affectedRows: results.affectedRows
    });
  });
};

const deleteNilai = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM nilai WHERE id = '${id}'`;
  
  console.log('Executing vulnerable DELETE query:', query);
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json({
      message: 'Nilai berhasil dihapus',
      affectedRows: results.affectedRows
    });
  });
};

module.exports = {
  getNilaiByMahasiswa,
  getAllNilai,
  createNilai,
  updateNilai,
  deleteNilai
};
