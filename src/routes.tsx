import React from "react";
import { useRoutes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./page/Homepage";
import NotFoundPage from "./page/NotFoundPage";

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
        {
          path: "*", element: <NotFoundPage/> 
      }
      ],
    },
  ]);

  return routes;
};

export default Router;