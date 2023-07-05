import React from "react";
import logo from "../images/header__logo.svg";
import { Link, useMatch } from "react-router-dom";
import line from "../images/line.svg";
import addBtn from "../images/vector_plus.svg";
import toggleMenu from "../images/toggle-menu.svg";

function Header({ handleSignOut, email }) {
  const [open, setOpen] = React.useState(false);

  const handleMenu = () => {
    setOpen(!open);
  };

  const onSignOut = () => {
    handleSignOut();
    setOpen(false);
  };

  return (
    <>
      <header className="header">
        <img src={logo} alt="Around the U.S." className="header__logo" />
        <img
          src={line}
          alt="Linea que divide el header"
          className="header__line"
        />

        {useMatch("/signin") && (
          <Link to="/signup" className="header__link">
            Regístrate
          </Link>
        )}

        {useMatch("/signup") && (
          <Link to="/signin" className="header__link">
            Inicia sesión
          </Link>
        )}

        {useMatch("/") && (
          <>
            <div
              className={`header__user-info ${
                open && "header__user-info_opened"
              }`}
            >
              <span className="header__email">{email}</span>
              <button className="header__logout" onClick={onSignOut}>
                Cerrar sesión
              </button>
            </div>
            {open ? (
              <img
                src={addBtn}
                alt="close menu"
                className="header__close-icon"
                onClick={handleMenu}
              />
            ) : (
              <img
                src={toggleMenu}
                alt="menu"
                className="header__menu-icon"
                onClick={handleMenu}
              />
            )}
          </>
        )}
      </header>
    </>
  );
}

export default Header;
