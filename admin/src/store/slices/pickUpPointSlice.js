// slice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPickupPoints,
  addPickUpPoints,
  deletePickUpPoints,
  updatePickUpPoints,
} from "../thunks/pickUpPointThunks";

const initialState = {
  pickuppoints: [],
  status: "idle",
  error: null,
};

export const pickUpPointSlice = createSlice({
  name: "pickuppoints",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPickupPoints.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPickupPoints.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pickuppoints = action.payload;
      })
      .addCase(fetchPickupPoints.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(addPickUpPoints.fulfilled, (state, action) => {
        state.pickuppoints.push(action.payload);
      })
      .addCase(deletePickUpPoints.fulfilled, (state, action) => {
        const id = action.payload;
        state.pickuppoints = state.pickuppoints.filter(
          (point) => point.id !== id
        );
      })
      .addCase(updatePickUpPoints.fulfilled, (state, action) => {
        const updatedPoint = action.payload;
        state.pickuppoints = state.pickuppoints.map((point) =>
          point.id === updatedPoint.id ? updatedPoint : point
        );
      });
  },
});

export default pickUpPointSlice.reducer;
