// src/pages/SignupPage.js

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupPage() {
  
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleInfos = (e) => {
    setUser({
    ...user,
    [e.target.name]:e.target.value
  });
}
  

const handleSignupSubmit = (e) => {

    e.preventDefault();
    const requestBody = user;
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })

  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={user.email} onChange={handleInfos} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInfos}
        />

        <button className="CurlyButton" type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
