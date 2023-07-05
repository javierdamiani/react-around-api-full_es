import React from "react";
import closeIcon from "../images/close_icon.svg";

function ImagePopup({isOpen, card, onClose}) {

  return (
    <>
      <div
        className={`"popup popup_img ${isOpen ? "popup__opened" : ""}`}
        id="modalPopUp"
      >
        <div className="popup__img">
          <div>
            <img
              src={card.link}
              alt=""
              className="popup__img-background"
              id="cardPopUp"
            />
            <img
              src={closeIcon}
              alt="Equis para cerrar el formulario"
              className="popup__img-close"
              id="closeImgBtn"
              onClick={onClose}
            />
            <p className="popup__img-title" id="popUpImgTitle">{card.name} </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImagePopup;
