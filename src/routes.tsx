import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./page/HomePage/Homepage";
import NotFoundPage from "./page/NotFoundPage";
import { useSelector } from "react-redux";
import { isAuthenticated } from "./redux/slices/login/authSlice";
import Dashboard from "./page/Dashboard";

const Router: React.FC = () => {
  const navigate = useNavigate();
  const auth = useSelector(isAuthenticated);

  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

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
          path: "*", element: <NotFoundPage/> 
      }
      ],
    },
  ]);
  return routes;
};

export default Router;