import { configureStore, combineReducers } from "@reduxjs/toolkit";
import  pickUpPointSlice   from './slices/pickUpPointSlice';
import locationSlice from "./slices/locationSlice";

export const store = configureStore({
    reducer: combineReducers({
        pickup: pickUpPointSlice,
        locations: locationSlice
    })
})