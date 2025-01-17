const express = require('express');
const {
  getAnime,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime,
  getAnimeWithPagination,
  searchAnime,
} = require('../controllers/animeController');

const router = express.Router();

router.get('/', getAnime);
router.get('/:id', getAnimeById);
router.post('/', createAnime);
router.put('/:id', updateAnime);
router.delete('/:id', deleteAnime);
router.get('/paginated', getAnimeWithPagination);
router.get('/search', searchAnime);

module.exports = router;
