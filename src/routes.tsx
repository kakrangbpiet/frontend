import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./page/Homepage";

const Router: React.FC = () => {


  const routes = useRoutes([

    {
      path: "",
      element: <Layout/>,
      children: [
        {
          path: "",
          element: <HomePage/>,
        },
      
      ],
    },
    { path: "*", element: <Navigate to="/" /> },
  ]);

  return routes;
};

export default Router;