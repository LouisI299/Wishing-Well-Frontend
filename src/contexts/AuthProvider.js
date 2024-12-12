//Imports
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { setupInterceptors } from "../utils/api";

//Create context
const AuthContext = createContext();

//AuthProvider component
export const AuthProvider = ({ children }) => {
  //State
  const [isAuthenticated, setIsAuthenticated] = useState(false); //State for authentication
  const [token, setToken] = useState(null); //State for token
  const [refreshToken, setRefreshToken] = useState(null); //State for refresh token
  const [loading, setLoading] = useState(true); //State for loading

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken"); // Get the token from localStorage
    const storedRefreshToken = localStorage.getItem("refreshToken"); // Get the refresh token from localStorage
    if (storedToken && storedRefreshToken) {
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  //Setup axios interceptors
  useEffect(() => {
    setupInterceptors(refreshTokenFunction);
  }, [token]);

  const login = (newToken, newRefreshToken) => {
    setIsAuthenticated(true);
    setToken(newToken);
    setRefreshToken(newRefreshToken);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
  };

  const refreshTokenFunction = async () => {
    try {
      const response = await axios.post("/api/users/refresh_token", {
        refresh_token: refreshToken,
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
      value={{
        isAuthenticated,
        token,
        login,
        logout,
        loading,
        refreshToken: refreshTokenFunction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
