//Imports
import React, { createContext, useContext, useState, useEffect } from "react";

//Create context
const AuthContext = createContext();

//AuthProvider component
export const AuthProvider = ({ children }) => {
  //State
  const [isAuthenticated, setIsAuthenticated] = useState(false); //State for authentication
  const [token, setToken] = useState(null); //State for token
  const [loading, setLoading] = useState(true); //State for loading

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken"); // Get the token from localStorage

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const login = (newToken) => {
    setIsAuthenticated(true);
    setToken(newToken);
    localStorage.setItem("authToken", newToken); // Store the token in localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("authToken"); // Remove the token from localStorage
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
