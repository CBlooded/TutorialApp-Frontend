import React from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    console.warn("UNAUTHORIZED ENTRY");
    return <Navigate to={"/"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
