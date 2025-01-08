import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth_Services/userAuth"; // Import the authentication context

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get the user from context

  // If the user is not logged in, redirect to the homepage
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children; // If user is logged in, render the protected route
};

export default ProtectedRoute;
