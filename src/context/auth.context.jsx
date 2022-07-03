import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const API_URL = "http://localhost:5005"
const AuthContext = createContext()

function AuthProviderWrapper({children}) {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ user, setUser ] = useState(null)
     
    

  return (
    <AuthContext.Provider value={{isLoggedIn}}>
        {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProviderWrapper}