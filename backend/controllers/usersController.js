const db = require('../config/db');
const md5 = require('md5');

const getAllUsers = (req, res) => {
  const query = `SELECT id, username, role, nama_lengkap, email FROM users ORDER BY id`;
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json(results);
  });
};

const getUserById = (req, res) => {
  const id = req.query.id;
  const query = `SELECT id, username, role, nama_lengkap, email FROM users WHERE id = '${id}'`;
  
  console.log('Executing vulnerable query:', query);
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json(results);
  });
};

const createUser = (req, res) => {
  const { username, password, role, nama_lengkap, email } = req.body;
  
  const hashedPassword = md5(password);
  const query = `INSERT INTO users (username, password, role, nama_lengkap, email) 
                 VALUES ('${username}', '${hashedPassword}', '${role}', '${nama_lengkap}', '${email}')`;

  console.log('Executing vulnerable INSERT query:', query);

  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json({
      message: 'User berhasil ditambahkan',
      id: results.insertId
    });
  });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const { username, password, role, nama_lengkap, email } = req.body;

  if (password) {
    const hashedPassword = md5(password);
    const query = `UPDATE users 
                   SET username = '${username}', 
                       password = '${hashedPassword}', 
                       role = '${role}', 
                       nama_lengkap = '${nama_lengkap}', 
                       email = '${email}' 
                   WHERE id = '${id}'`;

    console.log('Executing vulnerable UPDATE query:', query);

    db.query(query, (error, results) => {
      if (error) {
        return res.send(error.message);
      }
      res.json({
        message: 'User berhasil diupdate',
        affectedRows: results.affectedRows
      });
    });
  } else {
    const query = `UPDATE users 
                   SET username = '${username}', 
                       role = '${role}', 
                       nama_lengkap = '${nama_lengkap}', 
                       email = '${email}' 
                   WHERE id = '${id}'`;

    console.log('Executing vulnerable UPDATE query:', query);

    db.query(query, (error, results) => {
      if (error) {
        return res.send(error.message);
      }
      res.json({
        message: 'User berhasil diupdate',
        affectedRows: results.affectedRows
      });
    });
  }
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM users WHERE id = '${id}'`;
  
  console.log('Executing vulnerable DELETE query:', query);
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    res.json({
      message: 'User berhasil dihapus',
      affectedRows: results.affectedRows
    });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
