import express from "express";
import {
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
  getUserInfo,
} from "../controllers/users.js";
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const router = express.Router();

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

router.get("/", getUsers);
router.get("/:id", getUserId);
router.get("/me", getUserInfo);
router.patch("/me", updateUser);
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object({
      avatar: Joi.string().custom(validateURL).required(),
    }),
  }),
  updateAvatar
);

export default router;
