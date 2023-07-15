import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./views/HomePage";
import PickUpPointMgt from "./views/PickupPoints/PickUpPointMgt";
import BulkPickUpPoints from "./views/PickupPoints/AddBulkPickups";
import Layout from "./components/Layout/Layout";
import LocationsMgtPage from "./views/Locations/LocationsMgtPage";
import SingleAddOrEditPickUpP from "./views/PickupPoints/SingleAddOrEditPickup";
// import { store } from "./store/store";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/pick_up_points",
        element: <PickUpPointMgt />,
      },
      {
        path: "/pick_up_points/add-single",
        element: <SingleAddOrEditPickUpP />,
      },
      {
        path: "/pick_up_points/add-bulk",
        element: <BulkPickUpPoints />,
      },
      {
        path: "/pick_up_points/edit/:id",
        element: <SingleAddOrEditPickUpP />,
      },
      {
        path: "/locations",
        element: <LocationsMgtPage />,
      },
    ],
  },
]);
