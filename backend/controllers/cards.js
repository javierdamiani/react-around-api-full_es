import Card from '../models/card.js';

export const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

export const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

export const deleteCard = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== _id) {
        return res.status(403).send({ message: 'No tienes permisos para borrar esta tarjeta' });
      }
      card.deleteOne();
      return res.send({ data: card });
    })
    .catch(next);
};

export const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, {
    new: true,
  })
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch(next);
};

export const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, {
    new: true,
  })
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch(next);
};
