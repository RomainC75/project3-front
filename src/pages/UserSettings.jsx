import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import axios from 'axios';

function GetUserInfo() {
    const { isLoggedIn, isLoading, user } = useContext(AuthContext);
    axios.get(``)
}

function UserSettings() {
  return (
    <div></div>
  )
}

export default UserSettings