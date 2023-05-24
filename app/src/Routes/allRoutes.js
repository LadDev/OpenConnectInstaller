import React from "react";
import { Redirect } from "react-router-dom";

//Dashboard
import DashboardAnalytics from "../pages/DashboardAnalytics";

//login
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";

const authProtectedRoutes = [
  { path: "/dashboard", component: DashboardAnalytics },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: Logout },
  { path: "/login", component: Login }
];

export { authProtectedRoutes, publicRoutes };
