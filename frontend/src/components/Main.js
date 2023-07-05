import React from "react";
import editBtn from "../images/edit-button.svg";
import addBtn from "../images/vector_plus.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <div className="profile">
          <div className="profile__avatar-container">
            <img
              src={currentUser.avatar}
              alt="Imagen de una persona sonriente"
              className="profile__avatar"
            />
            <div
              onClick={props.onEditAvatar}
              className="profile__avatar-overlay"
            ></div>
          </div>

          <div className="profile__info">
            <img
              onClick={props.onEditProfile}
              src={editBtn}
              alt="Botón para editar el contenido del perfil"
              className="profile__info-button"
              id="editButton"
            />
            <div className="profile__info-text">
              <p className="profile__info-explorer" id="profAbout">
                {currentUser.about}
              </p>
              <p className="profile__info-name" id="profName">
                {currentUser.name}
              </p>
            </div>
          </div>
          <button
            onClick={props.onAddPlace}
            className="profile__add"
            id="addImg"
          >
            <img src={addBtn} alt="Imagen de un más para agregar contenido" />
          </button>
        </div>
        <div className="elements">
          {props.cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onDeleteCard={props.onDeleteCard}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}

export default Main;
