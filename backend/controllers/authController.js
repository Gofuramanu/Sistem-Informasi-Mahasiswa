const db = require('../config/db');
const crypto = require('crypto');

const md5 = (text) => crypto.createHash('md5').update(text).digest('hex');

const login = (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  
  console.log('Executing vulnerable login query:', query);
  
  db.query(query, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    
    if (results.length > 0) {
      const user = results[0];
      const hashedPassword = md5(password);
      
      if (hashedPassword === user.password) {
        res.json({
          message: 'Login berhasil',
          role: user.role,
          username: user.username,
          nama_lengkap: user.nama_lengkap
        });
      } else {
        res.send('Login gagal - password salah');
      }
    } else {
      res.send('Login gagal - username tidak ditemukan');
    }
  });
};

module.exports = {
  login
};
