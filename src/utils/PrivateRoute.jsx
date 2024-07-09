import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { existsInLocalStorage } from "./manageLocalStorage";

export const CompanyPrivateRoute = ({ children }) => {
  const location = useLocation();

  return existsInLocalStorage("company") ? (
    children
  ) : (
    <Navigate to="/company-login" state={{ from: location }} replace />
  );
};

export const ApplicantPrivateRoute = ({ children }) => {
  const location = useLocation();
  return existsInLocalStorage("applicant") ? (
    children
  ) : (
    <Navigate to="/applicant-login" state={{ from: location }} replace />
  );
};
