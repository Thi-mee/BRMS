import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../../views/HomePage";
import PickUpPointRegMgt from "../../../views/Pick-Up_Point_Reg_Mgt";
import SinglePickUpPoint from "../../../views/Single_PickUpPoint";
import BulkPickUpPoints from "../../../views/Bulk_PickUpPoints";
import Layout from "../Layout/Layout";

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
        element: <PickUpPointRegMgt />,
      },
      {
        path: "/pick_up_points/add-single",
        element: <SinglePickUpPoint />,
      },
      {
        path: "/pick_up_points/add-bulk",
        element: <BulkPickUpPoints />,
      },
    ],
  },
]);
