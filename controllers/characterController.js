const db = require('../models/db');

exports.getCharacters = (req, res) => {
  db.query('SELECT * FROM characters', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getCharacterById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM characters WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Character niet gevonden' });
    res.status(200).json(results[0]);
  });
};