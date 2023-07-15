import { configureStore, combineReducers } from "@reduxjs/toolkit";
import locationReducer from "./features/location/locationSlice";
import pickUpPointReducer from "./features/pickup/pickUpPointSlice";

export const store = configureStore({
    reducer: combineReducers({
        pickup: pickUpPointReducer,
        locations: locationReducer
    })
})