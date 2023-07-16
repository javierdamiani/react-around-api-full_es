import express from 'express';

import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';

const router = express.Router();

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/likes/:cardId', likeCard);
router.delete('/likes/:cardId', dislikeCard);

export default router;
