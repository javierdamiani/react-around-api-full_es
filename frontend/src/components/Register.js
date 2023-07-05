import React, { useState } from "react";
import * as auth from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [infoToolOpen, setInfoToolOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCloseInfoTool = () => {
    setInfoToolOpen(false);
    setError(false);
  };

  const onRegister = (evt) => {
    evt.preventDefault();
    const { password, email } = formData;
    auth.register(password, email).then((res) => {
      if (res.data) {
        navigate("/signin", { state: "success" });
      } else {
        setError(true);
      }
      setInfoToolOpen(true);
    });
  };

  return (
    <>
      <div className="register" onSubmit={onRegister}>
        <form action="" className="form">
          <h2 className="form__title">Regístrate</h2>
          <label className="form__label">
            <input
              type="email"
              className="form__input"
              placeholder="Correo electrónico"
              name="email"
              required
              onChange={handleChange}
            />
          </label>
          <label className="form__label">
            <input
              type="password"
              className="form__input"
              placeholder="Contraseña"
              name="password"
              required
              onChange={handleChange}
            />
          </label>
          <button className="form__button">Regístrate</button>
          <Link to="/signin" className="form__link">
            ¿Ya eres miembro? Inicia sesión aquí
          </Link>
        </form>
      </div>
      <InfoTooltip
        error={error}
        infoToolOpen={infoToolOpen}
        handleClose={handleCloseInfoTool}
      />
    </>
  );
};

export default Register;
