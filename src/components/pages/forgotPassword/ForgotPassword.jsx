import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="content">
        <h5 className="title">¿Olvidaste tu contraseña?</h5>
        <form>
          <div className="form">
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input"
            />
            <button type="submit" className="button">
              Recuperar
            </button>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="button"
            >
              Regresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
