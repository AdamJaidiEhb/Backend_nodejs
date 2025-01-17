const db = require('../models/db');

exports.getAnime = (req, res) => {
  db.query('SELECT * FROM anime', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getAnimeById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM anime WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Anime niet gevonden' });
    res.status(200).json(results[0]);
  });
};