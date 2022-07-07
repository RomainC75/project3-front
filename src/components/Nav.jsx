import React, { useContext } from "react";
import saxLogo from "../images/saxLogo.png";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Button from "@mui/material/Button";
import { CartContext } from "../context/cart.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/Nav.css";

export default function Nav() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const {cartState} = useContext(CartContext)
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
          
            <Link className="basketBlock" to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
            <p>{ 'products' in cartState && cartState.products.length }</p>
            </Link>
            <Button variant="contained" className="CurlyButton" onClick={logOutUser}>Logout</Button>
            <span>{user && user.name}</span>
          </>
        ) : (
          <>
            <Link to="/signup">
              <Button variant="contained" className="CurlyButton">Sign Up</Button>
            </Link>
            <Link to="/login">
              <Button variant="outlined" className="CurlyButton">Login</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
