import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Rect-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Components:
import RegistrationPage from "./pages/registration/RegistrationPage";
import LoginPage from "./pages/login/LoginPage";
import JobPortal from "./pages/JobPortal/JobPortal";
import Home from './pages/JobPortal/Body/Home/Home'
import Jobs from "./pages/JobPortal/Body/Jobs/Jobs";

import ApplicantDashboard from "./pages/JobPortal/Body/ApplicantDashboard/ApplicantDashboard";
import CompanyDashboard from "./pages/JobPortal/Body/CompanyDashboard/CompanyDashboard";


const router = createBrowserRouter([
  {
    path: "/",
    element: <JobPortal />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/applicantdashboard",
        element: <ApplicantDashboard />,
      },
      {
        path: "/companyDashboard",
        element: <CompanyDashboard />,
      },
    ],
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
