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
        <Link to='/'>
        <img src={saxLogo} alt="saxLogo" className="saxLogo" />
        </Link>
        <ul>
          <li>
            <Link to ="/">Products</Link>
          </li>
          <li>
            <NavLink to="/categories">Categories</NavLink>
          </li>
          {/* <li>{isLoggedIn}</li> */}
        </ul>
      </div>
      <div className="rightSide">
       
        {isLoggedIn ? (
          <>
            <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            <button className="CurlyButton" onClick={logOutUser}>Logout</button>
            <span>{user && user.name}</span>
          </>
        ) : (
          <>
            <Link to="/signup">
              <button className="CurlyButton">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="CurlyButton">Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
