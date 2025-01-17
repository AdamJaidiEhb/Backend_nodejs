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
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Naam is verplicht en moet tekst zijn' });
      }
      if (!genre || typeof genre !== 'string' || genre.trim() === '') {
        return res.status(400).json({ message: 'Genre is verplicht en moet tekst zijn' });
      }
      if (score && (isNaN(score) || score < 0 || score > 10)) {
        return res.status(400).json({ message: 'Score moet een getal zijn tussen 0 en 10' });
      }
      if (!release_date || isNaN(Date.parse(release_date))) {
        return res.status(400).json({ message: 'Ongeldige releasedatum' });
      }
      

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
  
    if (release_date && isNaN(Date.parse(release_date))) {
      return res.status(400).json({ message: 'Ongeldige releasedatum' });
    }
    if (score && (score < 0 || score > 10)) {
      return res.status(400).json({ message: 'Score moet tussen 0 en 10 liggen' });
    }
  
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

exports.getAnimeWithPagination = (req, res) => {
    const { limit, offset } = req.query;
  
    const sql = 'SELECT * FROM anime LIMIT ? OFFSET ?';
    db.query(sql, [parseInt(limit), parseInt(offset)], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  };

exports.searchAnime = (req, res) => {
    const { field, value } = req.query;
  
    const sql = `SELECT * FROM anime WHERE ${field} LIKE ?`;
    db.query(sql, [`%${value}%`], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  };

  exports.advancedSearchAnime = (req, res) => {
    const { name, genre } = req.query;
    let sql = 'SELECT * FROM anime WHERE 1=1';
    const params = [];
  
    if (name) {
      sql += ' AND name LIKE ?';
      params.push(`%${name}%`);
    }
    if (genre) {
      sql += ' AND genre LIKE ?';
      params.push(`%${genre}%`);
    }
  
    db.query(sql, params, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  };
  
  exports.sortAnime = (req, res) => {
    const { field, order } = req.query;
    const validFields = ['score', 'release_date'];
    const validOrder = ['ASC', 'DESC'];
  
    if (!validFields.includes(field) || !validOrder.includes(order)) {
      return res.status(400).json({ message: 'Ongeldige sorteeropties' });
    }
  
    const sql = `SELECT * FROM anime ORDER BY ${field} ${order}`;
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  };
  
  exports.getCharactersByAnime = (req, res) => {
    const { id } = req.params;
  
    db.query('SELECT * FROM characters WHERE anime_id = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  };
  
  
  
  