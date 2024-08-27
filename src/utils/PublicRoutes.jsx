import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../helpers/api";

const PublicRoutes = () => {
  const { access_token } = getToken();
  return access_token ? <Navigate to="/blogs" replace /> : <Outlet />;
};

export default PublicRoutes;
