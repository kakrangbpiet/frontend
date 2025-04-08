import React from "react";
import {  useRoutes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./page/HomePage/Homepage";
import NotFoundPage from "./page/NotFoundPage";
import Dashboard from "./page/Dashboard";
import AddPackagePage from "./page/Addpackage";
import AboutPage from "./page/AboutPage";
import SingleTravelPackageDetails from "./page/SinglePackage";
import AllUsers from "./page/Dashboard/AllUsers";
import ProfilePage from "./page/ProfilePage";
import UserInquiries from "./page/ProfilePage/UserInquiries";

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
          path: "/about-us",
          element: <AboutPage/>,
        },
        {
          path: "/package/:travelPackageId/:travelPackageTitle",
          element: <SingleTravelPackageDetails/>,
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
          path: "/users",
          element: <AllUsers />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/inquiries/:userId",
          element: <UserInquiries />,
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