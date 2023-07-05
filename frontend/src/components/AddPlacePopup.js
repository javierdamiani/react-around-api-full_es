import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props){

    const titleRef = React.createRef();
    const imageLinkRef = React.createRef();

    function handleSubmit(event) {
        event.preventDefault();
        const name = titleRef.current.value;
        const link = imageLinkRef.current.value;
        props.onAddPlaceSubmit({name, link});
    }

    return(
        <>
        <PopupWithForm
          name="card"
          title="Nuevo lugar"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
          <label className="popup__field">
            <input
              id="title"
              name="title"
              placeholder="Título"
              minLength="2"
              maxLength="30"
              type="text"
              className="popup__input"
              ref={titleRef}
              required
            />
            <p id="title-error" className="popup__error"></p>
          </label>
          <label className="popup__field">
            <input
              type="url"
              name="image-link"
              className="popup__input"
              id="linkImg"
              placeholder="Enlace a la imagen"
              ref={imageLinkRef}
              required
            />
            <p id="linkImg-error" className="popup__error"></p>
          </label>
        </PopupWithForm>
        </>
    )
}

export default AddPlacePopup