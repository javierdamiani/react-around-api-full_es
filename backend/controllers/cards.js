import cards from "../models/card.js";

export const getCards = (req, res) => {
  cards
    .find({})
    .then((card) => {
      if (!card) {
        const error = new Error("Cards not found");
        error.statusCode = 404;
        throw error;
      }
      res.send(card);
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

export const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id; // Utiliza el campo _id de req.user como owner

  cards
    .create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "SomeErrorName") {
        return res
          .status(ERROR_CODE)
          .send({ message: "Error message for SomeErrorName" });
      }
      res.status(500).send({ message: "Error" });
    });
};

export const deleteCard = (req, res) => {
  const { id } = req.params;
  const { cardId } = req.params;

  cards
    .findById(cardId)
    .then((card) => {
      if (!card) {
        const error = new Error("Card not found");
        error.statusCode = 404;
        throw error;
      }

      // Verificar los derechos del usuario
      if (card.owner.toString() !== req.user._id) {
        const error = new Error("No tienes permisos para borrar esta tarjeta");
        error.statusCode = 403;
        throw error;
      }

      // Borrar la tarjeta
      return card.remove();
    })
    .then((removedCard) => {
      res.send(removedCard);
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

export const likeCard = (req, res) => {
  const { id } = req.params;
  cards
    .findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .then((card) => {
      if (!card) {
        const error = new Error("Cards not found");
        error.statusCode = 404;
        throw error;
      }
      res.send(card);
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

export const dislikeCard = (req, res) => {
  const { id } = req.params;
  cards
    .findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        const error = new Error("Cards not found");
        error.statusCode = 404;
        throw error;
      }
      res.send(card);
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
