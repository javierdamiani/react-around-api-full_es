import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const { NODE_ENV, JWT_SECRET } = process.env;

export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const getUserId = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
  })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          {
            expiresIn: '7d',
          },
        ),
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

export const getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};
