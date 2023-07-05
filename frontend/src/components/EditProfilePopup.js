import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    // Evita que el navegador navegue hacia la dirección del formulario
    e.preventDefault();

    // Pasa los valores de los componentes gestionados al controlador externo
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <>
      <PopupWithForm
        name="profile"
        title="Editar Perfil"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}>
          <label className="popup__field">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              id="popupName"
              minLength="2"
              maxLength="40"
              className="popup__input popup__input_type_name"
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span id="popupName-error" className="popup__error"></span>
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
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <p id="popupAbout-error" className="popup__error"></p>
          </label>
          </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
