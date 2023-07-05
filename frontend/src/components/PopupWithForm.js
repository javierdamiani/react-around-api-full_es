import React from "react";

function PopupWithForm(props) {
  return (
    <>
      <div
        className={`popup popup_type_${props.name} ${
          props.isOpen ? "popup__opened" : ""
        }`}
      >
        <div className="popup__container">
          <button
            type="button"
            className="popup__close-button"
            onClick={props.onClose}
          ></button>
          <h3 className="popup__title">{props.title}</h3>
          <form
            className={`popup__form popup__form_type${props.name}`}
            name={props.name}
            onSubmit={props.onSubmit}
            noValidate
          >
            {props.children}
            <button
              type="submit"
              className={`popup__button popup__button_type_${props.name}`}
            >
              {props.name === "delete_card" ? "Si" : "Guardar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
