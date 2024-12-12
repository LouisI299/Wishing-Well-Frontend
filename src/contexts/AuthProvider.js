//Imports
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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

  const refreshToken = async () => {
    try {
      const response = await axios.post("/api/users/refresh_token/", {
        token,
      });
      const newToken = response.data.access_token;
      setToken(newToken);
      localStorage.setItem("authToken", newToken);
      return newToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, logout, loading, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
