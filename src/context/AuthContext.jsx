import React, { useState, useEffect } from "react";
import {
  checkIsAuthenticated,
  authSignUp,
  authLogin,
  authLogout,
} from "../services/auth";

export const AuthContext = React.createContext({});

export default function Auth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    checkAuth();
  }, []);


   
    const checkAuth = () => {
        setIsLoading(true);
        //setIsAuthenticated(true);

        checkIsAuthenticated()
            .then((result) => {
                console.log(result);
                setIsLoading(false);
                if (result.success) {
                    setUser({email: result.email, name: result.name})
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    return false;
                }
            })
            .catch(() => {
                setIsAuthenticated(false)
                setIsLoading(false);
            })
            
    }
       

  const login = (credentials) => {
    return authLogin(credentials)
      .then((result) => {
        if (result.success) {
          setUser({ email: result.email, name: result.name });
          setIsAuthenticated(true);
          return true;
        } else {
          setIsAuthenticated(false);
          return false;
        }
      })
      .catch((error) => {
        setIsAuthenticated(false);
        return false;
      });
  };

  const logout = () => {
    authLogout();
    setIsAuthenticated(false);
  };

  const signUp = (credentials) => {
    return authSignUp(credentials)
      .then((result) => {
        return result.success;
      })
      .catch((error) => {
        alert(error);
        setIsAuthenticated(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setIsLoading,
        login,
        logout,
        signUp,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
