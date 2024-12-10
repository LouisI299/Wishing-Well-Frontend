// Imports
import React, { createContext, useState, useContext } from "react";

// Create a context
const AuthContext = createContext();

// Create a provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set the initial value of isAuthenticated to false

  // Function to set isAuthenticated to true
  const login = () => {
    setIsAuthenticated(true);
  };

  // Function to set isAuthenticated to false
  const logout = () => {
    setIsAuthenticated(false);
  };

  // Return the AuthContext.Provider
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
