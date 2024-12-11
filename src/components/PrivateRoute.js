// Imports
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

// PrivateRoute component, can only be accessed by authenticated users
const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth(); // Get authentication and loading state from the AuthProvider

  if (loading) {
    // If the authProvider is still loading, display a loading message
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />; // If the user isn't authenticated, redirect to the login page
};

export default PrivateRoute;
