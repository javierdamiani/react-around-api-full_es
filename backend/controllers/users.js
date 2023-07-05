import bcrypt from "bcryptjs";
import jwt from "jsonwbtoken";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import mongoose from "mongoose";"
import user from "../models/user.js";

export const getUsers = (req, res) => {
  user
    .find({})
    .then((users) => {
      if (users.length === 0) {
        const error = new Error("Users not found");
        error.statusCode = 404;
        throw error;
      }
      res.send(users);
    })
    .catch((err) => {
      if (err.name === "SomeErrorName") {
        return res
          .status(ERROR_CODE)
          .send({ message: "Error message for SomeErrorName" });
      }
      res.status(500).send({ message: "Error" });
    });
};

export const getUserId = (req, res) => {
  user
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "SomeErrorName") {
        return res
          .status(ERROR_CODE)
          .send({ message: "Error message for SomeErrorName" });
      }
      res.status(500).send({ message: "Error" });
    });
};

export const createUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Invalid request body" });
  }

  const { email, password, name, about, avatar } = req.body;

  if (!name || !about || !avatar || !email || !password) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  bcrypt.hash(password, 10).then((hash) => {
    user
      .create({ email, password: hash, name, about, avatar })
      .then((user) => res.send({ data: user }))
      .catch(() => res.status(500).send({ message: "Error" }));
  });
};

export const updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Invalid request body" });
  }

  const { name, about } = req.body;

  user
    .findByIdAndUpdate(
      req.params.id,
      { name, about },
      { new: true, runValidators: true }
    )
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Error" }));
};

export const updateAvatar = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Invalid request body" });
  }

  const { avatar } = req.body;

  user
    .findByIdAndUpdate(
      req.params.id,
      { avatar },
      { new: true, runValidators: true }
    )
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "SomeErrorName") {
        return res
          .status(ERROR_CODE)
          .send({ message: "Error message for SomeErrorName" });
      }
      res.status(500).send({ message: "Error" });
    });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  return user
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: "Wrong email or password" });
    });
};

const getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};
