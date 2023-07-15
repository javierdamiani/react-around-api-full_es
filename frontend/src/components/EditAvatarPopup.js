import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar}) {

  const inputRef = React.createRef();
  const [errors, setErrors] = React.useState({}); 

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
    e.target.reset();
    onClose();
  }

  return (
    <>
      <PopupWithForm
        name="image_profile"
        title="Cambiar foto de perfil"
        isOpen={isOpen}
        onClose={onClose}
        errors={errors}
        setErrors={setErrors}
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
          >{errors['image-link']}</p>
        </label>
      </PopupWithForm>
    </>
  );
}

export default EditAvatarPopup;
