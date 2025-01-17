const express = require('express');
const { getAnime, getAnimeById, createAnime, updateAnime, deleteAnime } = require('../controllers/animeController');

const router = express.Router();

router.get('/', getAnime);
router.get('/:id', getAnimeById);
router.post('/', createAnime);
router.put('/:id', updateAnime);
router.delete('/:id', deleteAnime);

module.exports = router;

const { getAnimeWithPagination } = require('../controllers/animeController');

router.get('/paginated', getAnimeWithPagination);

const { searchAnime } = require('../controllers/animeController');

// Voeg de zoekroute toe
router.get('/search', searchAnime);

