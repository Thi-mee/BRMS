import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from "../../../views/HomePage";
import PickUpPointRegMgt from '../../../views/Pick-Up_Point_Reg_Mgt';
import SinglePickUpPoint from '../../../views/Single_PickUpPoint';
import BulkPickUpPoints from "../../../views/Bulk_PickUpPoints";

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