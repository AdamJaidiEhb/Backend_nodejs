const express = require('express');
const bodyParser = require('body-parser');
const animeRoutes = require('./routes/animeRoutes');
const characterRoutes = require('./routes/characterRoutes');

const app = express();
const PORT = 3306;

app.use(bodyParser.json());

app.use('/api/anime', animeRoutes);
app.use('/api/characters', characterRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Anime/Manga API</h1><p>Bekijk de API-documentatie <a href="/docs">hier</a>.</p>');
});

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
