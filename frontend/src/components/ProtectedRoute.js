import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute Component
 * Ensures only authenticated users can access certain routes
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
