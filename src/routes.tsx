import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./page/HomePage/Homepage";
import NotFoundPage from "./page/NotFoundPage";
import { useSelector } from "react-redux";
import { isAuthenticated } from "./redux/slices/login/authSlice";
import Dashboard from "./page/Dashboard";
import AddPackagePage from "./page/Addpackage";

const Router: React.FC = () => {


  const routes = useRoutes([
    {
      path: "",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <HomePage/>,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/addTravelPackage",
          element: <AddPackagePage />,
        },
        {
          path: "*", element: <NotFoundPage/> 
      }
      ],
    },
  ]);
  return routes;
};

export default Router;