import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "../helpers/api";

const PrivateRoutes = () => {
  const location = useLocation();
  const { access_token } = getToken();
  return access_token ? (
    <Outlet />
  ) : (
    <Navigate to="/users/sign-in" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
