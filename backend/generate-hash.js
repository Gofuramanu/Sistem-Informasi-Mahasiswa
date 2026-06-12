const crypto = require('crypto');

const md5 = (text) => crypto.createHash('md5').update(text).digest('hex');

console.log('Password: admin123');
console.log('MD5 Hash:', md5('admin123'));
console.log('');

console.log('Password: staff123');
console.log('MD5 Hash:', md5('staff123'));