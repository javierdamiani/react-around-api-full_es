import React, { useContext } from "react";
import trashCan from "../images/trashCan.svg";
import likeBtn from "../images/like_button.svg";
import rectangle from "../images/Rectangle.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Verificando si el usuario actual es el propietario de la tarjeta actual
  const isOwn = props.card.owner._id === currentUser._id;

  // Creando una variable que después establecerás en `className` para el botón eliminar
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn
      ? "elements__template_element-trash_active "
      : "elements__template_element-trash"
  }`;

  // Verifica si el usuario actual le dio "like" a la tarjeta
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Crea una variable que después establecerás en `className` para el botón like
  const cardLikeButtonClassName = `card__like-button ${
    isLiked
      ? "elements__template_element-button_active "
      : "elements__template_element-button"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <>
      <div
        key={props.card._id}
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
            {props.card.likes ? props.card.likes.length : 0}
          </p>
        </div>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="elements__template_element-image"
          id="cardImg"
          onClick={handleClick}
        />
        <p className="elements__template_element-text" id="cardTitle">
          {props.card.name}
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
