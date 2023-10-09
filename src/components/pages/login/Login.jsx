import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import "./Login.css";
import {loginGoogle, onSignIn} from '../../../firebaseConfig'

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email:'',
    password:''
  })

  const handleChange = (e) => {
    setUserCredentials({...userCredentials, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await onSignIn(userCredentials);
      
      if(res.user){
        navigate('/');
      }  
    } catch (error) {
      console.log(error);  
    }
  }

  const googleSignIn = async () => {
    let res = await loginGoogle();
    return res;
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="input">
          <input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="input"
          />
        </div>
        <div className="passwordContainer">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            placeholder="Contraseña"
            className="input"
          />
          <span
            onClick={handleClickShowPassword}
            className="passwordToggle"
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
          className="googleButton"
          onClick={googleSignIn} 
        >
          <GoogleIcon style={{ marginRight: "8px" }} /> Ingresa con Google
        </button>
        <p style={{ color: "var(--color-secondary)", marginTop: "10px" }}>
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
