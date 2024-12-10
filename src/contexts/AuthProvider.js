// Imports
import React, { createContext, useState, useContext } from "react";

// Create a context
const AuthContext = createContext();

// Create a provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set the initial value of isAuthenticated to false
  const [token, setToken] = useState(null);

  // Function to set isAuthenticated to true
  const login = (newToken) => {
    setIsAuthenticated(true);
    setToken(newToken);
  };

  // Function to set isAuthenticated to false
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
  };

  // Return the AuthContext.Provider
  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
