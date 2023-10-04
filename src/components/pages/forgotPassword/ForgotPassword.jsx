import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../firebaseConfig";

const ForgotPassword = () => {

  const [email, setEmail] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await forgotPassword(email);
    navigate('/login')
  }

  return (
    <div className="container">
      <div className="content">
        <h5 className="title">¿Olvidaste tu contraseña?</h5>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <input
              type="text"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
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
