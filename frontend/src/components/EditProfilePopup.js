import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({  isOpen,
  onClose,
  onUpdateUser}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    setName('');
    setDescription('');
  }, [currentUser]);

  function handleSubmit(e) {
    // Evita que el navegador navegue hacia la dirección del formulario
    e.preventDefault();
    // Pasa los valores de los componentes gestionados al controlador externo
    onUpdateUser({
      name,
      about: description,
    });
    onClose()
  }

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  return (
    <>
      <PopupWithForm
        name="profile"
        title="Editar Perfil"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        setErrors={setErrors}>
          <label className="popup__field">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              id="popupName"
              minLength="2"
              maxLength="40"
              className="popup__input popup__input_type_name"
              value={name}
              onChange={handleNameChange}
              required
            />
            <span id="popupName-error" className="popup__error popup__error_visible">{errors.name}</span>
          </label>
          <label className="popup__field">
            <input
              type="text"
              name="about"
              placeholder="Acerca de mi"
              minLength="2"
              maxLength="200"
              id="popupAbout"
              className="popup__input popup__input_type_about"
              value={description}
              onChange={handleDescriptionChange}
              required
            />
            <p id="popupAbout-error" className="popup__error popup__error_visible">{errors.about}</p>
          </label>
          </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
