import React from "react";
import editBtn from "../images/edit-button.svg";
import addBtn from "../images/vector_plus.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile,
  onAddPlace,
  onEditAvatar,
  onDeleteCard,
  onCardClick,
  onCardLike,
  cards}) {
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
              onClick={onEditAvatar}
              className="profile__avatar-overlay"
            ></div>
          </div>

          <div className="profile__info">
            <img
              onClick={onEditProfile}
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
            onClick={onAddPlace}
            className="profile__add"
            id="addImg"
          >
            <img src={addBtn} alt="Imagen de un más para agregar contenido" />
          </button>
        </div>
        <div className="elements">
        {cards &&
              cards
                .slice()
                .reverse()
                .map((card) => (
                  <Card
                    key={card._id}
                    card={card}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onDeleteCard={onDeleteCard}
                  />
                ))}
        </div>
      </main>
    </>
  );
}

export default Main;
