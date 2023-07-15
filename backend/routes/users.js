import express from 'express';
import validator from 'validator';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
  getUserInfo,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/id/:id', getUserId);
router.get('/me', getUserInfo);
router.patch('/me', updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value, helpers) => {
      if (!validator.isURL(value)) {
        return helpers.error('string.uri');
      }
      return value;
    }),
  }),
}), updateAvatar);

export default router;
