import React, { createRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = React.createRef()

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
    e.target.reset();
  }

  return (
    <>
      <PopupWithForm
        name="image_profile"
        title="Cambiar foto de perfil"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <label className="popup__field">
          <input
            type="url"
            name="image-link"
            placeholder="Imagen URL"
            id="popUpInputImage"
            className="popup__input"
            ref={inputRef}
            required
          />
          <p
            id="popUpInputImage-error"
            className="popup__error popup-input-image-error"
          ></p>
        </label>
      </PopupWithForm>
    </>
  );
}

export default EditAvatarPopup;
