import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from "../../../../pages/admin/HomePage";
import PickUpPointRegMgt from '../../../../pages/admin/Pick-Up_Point_Reg_Mgt';
import SinglePickUpPoint from '../../../../pages/admin/Single_PickUpPoint';
import BulkPickUpPoints from "../../../../pages/admin/Bulk_PickUpPoints";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/pick_up_point_reg",
        element: <PickUpPointRegMgt/>,
        children: [
            {
                path: "/pick_up_point_reg/single_pickup_point",
                element: <SinglePickUpPoint/>
            },
            {
                path: "/pick_up_point_reg/bulk_pickup_points",
                element: <BulkPickUpPoints/>
            }
        ]
    }
])