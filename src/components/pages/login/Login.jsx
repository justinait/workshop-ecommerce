import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import "./Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  return (
    <div className="container">
      <form className="form">
        <div className="input">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="input"
          />
        </div>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            className="input"
          />
          <span
            onClick={handleClickShowPassword}
            className="password-toggle"
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>
        <Link to="/forgot-password" className="link">
          ¿Olvidaste tu contraseña?
        </Link>
        <button
          type="submit"
          className="button"
        >
          Ingresar
        </button>
        <button
          type="button"
          className="google-button"
        >
          <GoogleIcon style={{ marginRight: "8px" }} /> Ingresa con Google
        </button>
        <p style={{ color: "#ffb630", marginTop: "10px" }}>
          ¿Aún no tienes cuenta?
        </p>
        <button
          type="button"
          onClick={()=>navigate("/register")}
          className="button"
        >
          Regístrate
        </button>
      </form>
    </div>
  );
};

export default Login;
