import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div
      className="container"
    >
      <form>
        <div className="form">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="input"
          />
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
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              className="input"
            />
            <span
              onClick={handleClickShowPassword}
              className="password-toggle"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>
          <Link to="/login" className="link">
            Regresar
          </Link>
          <button
            type="submit"
            className="button"
          >
            Registrarme
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
