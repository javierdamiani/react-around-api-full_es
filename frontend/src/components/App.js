import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import { useNavigate } from "react-router-dom";

function App() {
  const [isEditProfilePopUpOpen, setIsEditProfilePopUpOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopUpOpen] =
    React.useState(false);
  const [isAddPlacePopUpOpen, setIsAddPlacePopUpOpen] = React.useState(false);
  const [isDeleteCardPopUpOpen, setIsDeleteCardPopUpOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isSelectedCardOpen, setIsSelectedCardOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [token, setToken] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    if(token) {
      api
      .getCardList(token)
      .then((data) => {
        setCards(data.data);
      });
    }
  }, [token])

  React.useEffect(() => {
    if(token) {
      api
      .getUserInfo(token)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => console.log(error));
    }
  }, [token])

  function onEditProfileClick() {
    setIsEditProfilePopUpOpen(true);
  }

  function onEditAvatarClick() {
    setIsEditAvatarPopUpOpen(true);
  }

  function onAddPlaceClick() {
    setIsAddPlacePopUpOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsSelectedCardOpen(true);
  }

  function handleCardDelete(cardId) {
    api.removeCard(
      cardId,
      () => setCards((state) => state.filter((c) => c._id !== cardId)),
      token
    );
  };

  function closeAllPopups() {
    setIsAddPlacePopUpOpen(false);
    setIsEditAvatarPopUpOpen(false);
    setIsEditProfilePopUpOpen(false);
    setIsSelectedCardOpen(false);
    setIsDeleteCardPopUpOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({name, about}) {
    api
      .editProfile({name, about}, token)
      .then((data) =>
        setCurrentUser({
          ...currentUser,
          name: data.data.name,
          about: data.data.about,
        })
      );
  };

  function handleUpdateAvatar(link) {
    api
      .setUserAvatar(link, token)
      .then((data) =>
        setCurrentUser({...currentUser, avatar: data.avatar})
      );
  };

  const handleAddPlaceSubmit = ({ title, link }) => {
    api.addCard({ title, link }, token).then((newCard) => {
      setCards([...cards, newCard.data]);
    });
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setEmail("");
    setLoggedIn(false);
  };

  React.useEffect(() => {
    const handleTokenCheck = () => {
      if (localStorage.getItem("jwt")) {
        const jwt = localStorage.getItem("jwt");
        setToken(jwt);
        auth
          .checkToken(jwt)
          .then((res) => {
            if (res.data) {
              setEmail(res.data.email);
              setLoggedIn(true);
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    handleTokenCheck();
  }, [loggedIn, navigate]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header handleSignOut={handleSignOut} email={email} />

        <Routes>
          <Route path="/" element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route
              path="/"
              element={
                <Main
                  onEditProfile={onEditProfileClick}
                  onAddPlace={onAddPlaceClick}
                  onEditAvatar={onEditAvatarClick}
                  onCardDelete={handleCardDelete}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  cards={cards}
                />
              }
            />
          </Route>
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>

        <InfoTooltip />

        <EditProfilePopup
          isOpen={isEditProfilePopUpOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopUpOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="delete_card"
          title="¿Estás seguro/a?"
          isOpen={isDeleteCardPopUpOpen}
          onClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup
          card={selectedCard}
          isOpen={isSelectedCardOpen}
          onClose={closeAllPopups}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
