// Imports
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

// Component to render a private route (Not acccesible unless logged in)
const PrivateRoute = ({ element: Component }) => {
  const { isAuthenticated } = useAuth(); // Get the isAuthenticated value from the AuthProvider

  return isAuthenticated ? Component : <Navigate to="/login" />; // If the user is logged in, render the component, else redirect to the login page
};

// Export the component
export default PrivateRoute;
