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

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.patch('/me', updateUser);
router.get('/:id', getUserId);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object({
      avatar: Joi.string().custom(validateURL).required(),
    }),
  }),
  updateAvatar,
);

export default router;
