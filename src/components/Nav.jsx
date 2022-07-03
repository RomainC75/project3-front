import React, { useContext } from "react";
import saxLogo from "../images/saxLogo.png";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/Nav.css";

export default function Nav() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav className="Nav">
      <div className="leftSide">
        <img src={saxLogo} />
        <li>
          <ul>
            <NavLink to="/home" />
            Home
          </ul>
          <ul>
            <NavLink to="/categories" />
            Catégories
          </ul>
          <ul>{isLoggedIn}</ul>
        </li>
      </div>
      <div className="rightSide">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
       

        {isLoggedIn ? (
          <>
            <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            <button onClick={logOutUser}>Logout</button>
            <span>{user && user.name}</span>
          </>
        ) : (
          <>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
