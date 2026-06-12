const db = require('../config/db');

const getAllJurusan = (req, res) => {
  const query = `SELECT * FROM jurusan ORDER BY id`;
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json(results);
  });
};

const getJurusanById = (req, res) => {
  const id = req.query.id;
  const query = `SELECT * FROM jurusan WHERE id = '${id}'`;
  
  console.log('Executing vulnerable query:', query);
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json(results);
  });
};

const createJurusan = (req, res) => {
  const { nama_jurusan, fakultas } = req.body;
  const query = `INSERT INTO jurusan (nama_jurusan, fakultas) 
                 VALUES ('${nama_jurusan}', '${fakultas}')`;
  
  console.log('Executing vulnerable INSERT query:', query);
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json({
      message: 'Jurusan berhasil ditambahkan',
      id: results.insertId
    });
  });
};

const updateJurusan = (req, res) => {
  const id = req.params.id;
  const { nama_jurusan, fakultas } = req.body;
  const query = `UPDATE jurusan 
                 SET nama_jurusan = '${nama_jurusan}', 
                     fakultas = '${fakultas}' 
                 WHERE id = '${id}'`;
  
  console.log('Executing vulnerable UPDATE query:', query);
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json({
      message: 'Jurusan berhasil diupdate',
      affectedRows: results.affectedRows
    });
  });
};

const deleteJurusan = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM jurusan WHERE id = '${id}'`;
  
  console.log('Executing vulnerable DELETE query:', query);
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json({
      message: 'Jurusan berhasil dihapus',
      affectedRows: results.affectedRows
    });
  });
};

module.exports = {
  getAllJurusan,
  getJurusanById,
  createJurusan,
  updateJurusan,
  deleteJurusan
};
