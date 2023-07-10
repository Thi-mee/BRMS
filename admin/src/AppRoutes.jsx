import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./views/HomePage";
import PickUpPointMgt from "./views/PickupPoints/PickUpPointMgt";
import SinglePickUpPoint from "./views/PickupPoints/Single_PickUpPoint";
import BulkPickUpPoints from "./views/PickupPoints/Bulk_PickUpPoints";
import Layout from "./components/Layout/Layout";
import LocationsMgtPage from "./views/Locations/LocationsMgtPage";


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
        element: <SinglePickUpPoint />,
      },
      {
        path: "/pick_up_points/add-bulk",
        element: <BulkPickUpPoints />,
      },
      {
        path: "/locations",
        element: <LocationsMgtPage />,
      }
    ],
  },
]);
