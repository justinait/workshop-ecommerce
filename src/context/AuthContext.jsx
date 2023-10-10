import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

function AuthContextComponent({children}) {

    const [user, setUser] = useState({});
    const [isLogged, setIsLogged] = useState(false);

    const handleLogin = ( userLogged ) => {
      setUser(userLogged);
      setIsLogged(true);
    }
    
    const handleLogoutAuth = () => {
      setUser({});
      setIsLogged(false);
    }

    let data = {
        handleLogin,
        handleLogoutAuth,
        user,
        isLogged
    }

  return (
    <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextComponent