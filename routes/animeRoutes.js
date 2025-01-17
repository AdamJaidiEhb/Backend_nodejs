const express = require('express');
const {
  getAnime,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime,
  getAnimeWithPagination,
  searchAnime,
  advancedSearchAnime,
  sortAnime,
  getCharactersByAnime,
} = require('../controllers/animeController');

const router = express.Router();

router.get('/', getAnime);
router.get('/:id', getAnimeById);
router.post('/', createAnime);
router.put('/:id', updateAnime);
router.delete('/:id', deleteAnime);
router.get('/paginated', getAnimeWithPagination);
router.get('/search', searchAnime);
router.get('/advanced-search', advancedSearchAnime);
router.get('/sort', sortAnime);
router.get('/:id/characters', getCharactersByAnime);

module.exports = router;
