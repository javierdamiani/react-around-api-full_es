import React from "react";
import accepted from "../images/accepted.jpg";
import denied from "../images/denied.jpg";

const InfoTooltip = ({ error, infoToolOpen, handleClose }) => {
  return (
    <div className={`popup ${infoToolOpen && "popup__opened"}`}>
      <div className="popup__container infoTooltip">
        <button
          alt="Icono de cerrar"
          className="popup__close-button"
          onClick={handleClose}
        ></button>
        {error ? (
          <>
            <img src={denied} alt="Icono de rechazo" className="popup__image" />
            <h2 className="popup__title popup__title_tooltip">
              Uy, algo salió mal. Por favor, inténtalo de nuevo
            </h2>
          </>
        ) : (
          <>
            <img
              src={accepted}
              alt="Icono de aprobación"
              className="popup__image"
            />
            <h2 className="popup__title popup__title_tooltip">
              ¡Correcto! Ya estás registrado
            </h2>
          </>
        )}
      </div>
    </div>
  );
};

export default InfoTooltip;
