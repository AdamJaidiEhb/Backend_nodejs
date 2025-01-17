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

exports.createAnime = (req, res) => {
    const { name, genre, release_date, score } = req.body;
    if (!name || !genre) return res.status(400).json({ message: 'Naam en genre zijn verplicht' });
  
    db.query(
      'INSERT INTO anime (name, genre, release_date, score) VALUES (?, ?, ?, ?)',
      [name, genre, release_date, score],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, name, genre, release_date, score });
      }
    );
  };
  
  exports.updateAnime = (req, res) => {
    const { id } = req.params;
    const { name, genre, release_date, score } = req.body;
  
    db.query(
      'UPDATE anime SET name = ?, genre = ?, release_date = ?, score = ? WHERE id = ?',
      [name, genre, release_date, score, id],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Anime niet gevonden' });
        res.status(200).json({ message: 'Anime bijgewerkt' });
      }
    );
  };
  
  exports.deleteAnime = (req, res) => {
    const { id } = req.params;
  
    db.query('DELETE FROM anime WHERE id = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ message: 'Anime niet gevonden' });
      res.status(200).json({ message: 'Anime verwijderd' });
    });
  };