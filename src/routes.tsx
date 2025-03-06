import React from "react";
import { useRoutes } from "react-router-dom";
import AboutPage from "./page/AboutPage";
import NotFoundPage from "./page/NotFoundPage";
import Layout from "./components/Layout";
import HomePage from "./page/Homepage";

const Router: React.FC = () => {


  const routes = useRoutes([

    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage/>,
        },
        {
          path: "/about",
          element: <AboutPage/>,
        },
      
        { path: "*", element: <NotFoundPage/> },
      ],
    },
  ]);

  return routes;
};

export default Router;