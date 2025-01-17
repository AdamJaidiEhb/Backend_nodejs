const mysql = require('mysql2');

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'anime_manga_db',
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Databaseverbinding mislukt:', err);
    return;
  }
  console.log('Verbonden met de database.');
});

module.exports = db;
