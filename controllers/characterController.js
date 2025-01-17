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

exports.createCharacter = (req, res) => {
  const { name, role, anime_id } = req.body;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'Naam is verplicht en moet tekst zijn' });
  }
  if (!role || (role !== 'Main' && role !== 'Supporting')) {
    return res.status(400).json({ message: 'Rol moet "Main" of "Supporting" zijn' });
  }
  if (anime_id && isNaN(anime_id)) {
    return res.status(400).json({ message: 'anime_id moet een geldig getal zijn' });
  }
  

  db.query(
    'INSERT INTO characters (name, role, anime_id) VALUES (?, ?, ?)',
    [name, role, anime_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: results.insertId, name, role, anime_id });
    }
  );
};

exports.updateCharacter = (req, res) => {
  const { id } = req.params;
  const { name, role, anime_id } = req.body;

  db.query(
    'UPDATE characters SET name = ?, role = ?, anime_id = ? WHERE id = ?',
    [name, role, anime_id, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ message: 'Character niet gevonden' });
      res.status(200).json({ message: 'Character bijgewerkt' });
    }
  );
};

exports.deleteCharacter = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM characters WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Character niet gevonden' });
    res.status(200).json({ message: 'Character verwijderd' });
  });
};
