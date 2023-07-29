import { createBrowserRouter } from "react-router-dom";
import PickUpPointMgt from "./views/PickupPoints/PickUpPointMgt";
import BulkPickUpPoints from "./views/PickupPoints/AddBulkPickups";
import Layout from "./components/Layout/Layout";
import LocationsMgtPage from "./views/Locations/LocationsMgtPage";
import SingleAddOrEditPickUpP from "./views/PickupPoints/SingleAddOrEditPickup";
import RouteMgt from "./views/Routes/RouteMgt";
import RouteMap from "./views/Routes/RouteMapping";

import DashBoardPage from "./views/DashBoard/DashBoardPage";


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <DashBoardPage />,
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
      {
        path: "/routes",
        element: <RouteMgt />,
      },
      {
        path: "/routes/mapped-points/:id",
        element: <RouteMap />,
      },
      {
        path: "/authorize-workflow",
        element: (
          <div className="page">
            <h1>Authorize Workflow</h1>
          </div>
        ),
      },
    ],
  },
]);
