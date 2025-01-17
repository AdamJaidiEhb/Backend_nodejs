const express = require('express');
const bodyParser = require('body-parser');
const animeRoutes = require('./routes/animeRoutes');
const characterRoutes = require('./routes/characterRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Routes voor anime en characters
app.use('/api/anime', animeRoutes);
app.use('/api/characters', characterRoutes);

// Route voor rootpagina
app.get('/', (req, res) => {
    res.send(`
      <h1>Welkom bij de Anime/Manga API</h1>
      <p>Ga naar <a href="/docs">/docs</a> voor documentatie van de API.</p>
    `);
});

// Documentatiepagina
app.get('/docs', (req, res) => {
    res.send(`
      <h1>Anime/Manga API Documentatie</h1>
      <ul>
        <li><strong>GET /api/anime</strong>: Haal alle anime op</li>
        <li><strong>GET /api/anime/:id</strong>: Haal één specifieke anime op</li>
        <li><strong>POST /api/anime</strong>: Voeg een nieuwe anime toe</li>
        <li><strong>PUT /api/anime/:id</strong>: Update een bestaande anime</li>
        <li><strong>DELETE /api/anime/:id</strong>: Verwijder een anime</li>
        <li><strong>GET /api/anime/paginated</strong>: Haal anime op met limit en offset</li>
        <li><strong>GET /api/anime/search?field=&value=</strong>: Zoek anime op een specifiek veld</li>
        <li><strong>GET /api/characters</strong>: Haal alle characters op</li>
        <li><strong>GET /api/characters/:id</strong>: Haal één specifieke character op</li>
        <li><strong>POST /api/characters</strong>: Voeg een nieuw character toe</li>
        <li><strong>PUT /api/characters/:id</strong>: Update een bestaande character</li>
        <li><strong>DELETE /api/characters/:id</strong>: Verwijder een character</li>
      </ul>
    `);
});

// Start de server
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});

// Test de databaseverbinding
const db = require('./models/db');
db.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) {
        console.error('Databaseverbinding mislukt:', err.message);
    } else {
        console.log('Database werkt correct:', results);
    }
});
