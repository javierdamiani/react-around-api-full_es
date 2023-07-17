import React from "react";
import trashCan from "../images/trashCan.svg";
import likeBtn from "../images/like_button.svg";
import rectangle from "../images/Rectangle.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  // Verificando si el usuario actual es el propietario de la tarjeta actual
  const isOwn = card.owner._id === currentUser._id;

  // Creando una variable que después establecerás en `className` para el botón eliminar
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn
      ? "elements__template_element-trash_active "
      : "elements__template_element-trash"
  }`;

  // Verifica si el usuario actual le dio "like" a la tarjeta
  const isLiked = card.likes.some((id) => id === currentUser._id);

  // Crea una variable que después establecerás en `className` para el botón like
  const cardLikeButtonClassName = `card__like-button ${
    isLiked
      ? "elements__template_element-button_active "
      : "elements__template_element-button"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <>
      <div
        key={card._id}
        className="elements__template_element"
        id="cities"
      >
        <img
          src={trashCan}
          alt="Imagen de un contenedor de basura para eliminar la tarjeta"
          className={cardDeleteButtonClassName}
          id="trashCan"
          onClick={handleDeleteClick}
        />
        <div>
          <img
            src={likeBtn}
            alt="Botón de corazón para dar like"
            className={cardLikeButtonClassName}
            id="likeBtn"
            onClick={handleLikeClick}
          />
          <p className="elements__template_element-counter" id="heartCounter">
            {card.likes ? card.likes.length : 0}
          </p>
        </div>
        <img
          src={card.link}
          alt={card.name}
          className="elements__template_element-image"
          id="cardImg"
          onClick={handleClick}
        />
        <p className="elements__template_element-text" id="cardTitle">
          {card.name}
        </p>
        <img
          src={rectangle}
          alt="Recángulo blanco que contiene las imágenes de las tarjetas"
          className="elements__template_element-rectangle"
        />
      </div>
    </>
  );
}

export default Card;
