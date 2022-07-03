import React, { useContext } from 'react'
import saxLogo from '../images/saxLogo.png'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import './styles/Nav.css'


export default function Nav() {
    const { isLoggedIn, user } = useContext(AuthContext)
    return (
    <nav className="Nav">
        <div className="leftSide">
            <img src={saxLogo}/>
            <li>
                <ul><NavLink to="/home"/>Home</ul>
                <ul><NavLink to="/categories"/>Catégories</ul>
                <ul>{isLoggedIn}</ul>
            </li>
        </div>
        <div className="rightSide">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <FontAwesomeIcon icon={faCartShopping} />
        </div>
    </nav>
  )
}
