// src/pages/LoginPage.js
import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import './styles/SignupAndLoginPage.css'
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function LoginPage(props) {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const {storeToken, authenticateUser} = useContext(AuthContext)

  const handleInfos = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = (e) => {
    console.log('infos to submit : ', user)
    e.preventDefault();
    axios
      .post(`${API_URL}/auth/signin`, user)
      .then((response) => {
        console.log("JWT token", response.data.token);
        storeToken(response.data.token); 
        authenticateUser()
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInfos}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInfos}
        />

        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
