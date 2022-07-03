import React, { useContext } from 'react'
import saxLogo from '../images/saxLogo.png'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'



export default function Nav() {
    const { isLoggedIn } = useContext(AuthContext)
    return (
    <div className="Nav">
        <div className="leftSide">
            <img src={saxLogo}/>
            <li>
                <ul><NavLink to="/home"/>Home</ul>
                <ul><NavLink to="/categories"/>Catégories</ul>
                <ul>{isLoggedIn}</ul>
                <ul>3</ul>
            </li>
        </div>
        <div className="rightSide">
            
        </div>
        
    </div>
  )
}
