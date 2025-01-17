const express = require('express');
const {
  getCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} = require('../controllers/characterController');

const router = express.Router();

router.get('/', getCharacters);
router.get('/:id', getCharacterById);
router.post('/', createCharacter);
router.put('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);

module.exports = router;
