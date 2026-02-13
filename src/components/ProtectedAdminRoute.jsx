import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAdminSession } from "../adminApi";

const ProtectedAdminRoute = () => {
  const session = getAdminSession();

  // If no session or session expired (getAdminSession handles expiry), redirect
  if (!session || !session.token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
