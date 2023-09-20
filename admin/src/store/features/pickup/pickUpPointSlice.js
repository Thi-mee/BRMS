// slice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPickupPoints,
  addPickUpPoints,
  deletePickUpPoint,
  updatePickUpPoints,
  addBulkPickUpPoints,
} from "./pickUpPointThunks";
import { REQUEST_STATUS } from "../../../utils/constants";

const initialState = {
  pickuppoints: [],
  fetchStatus: REQUEST_STATUS.LOADING,
  deleteStatus: REQUEST_STATUS.IDLE,
  addStatus: REQUEST_STATUS.IDLE,
  updateStatus: REQUEST_STATUS.IDLE,
  addBulkStatus: REQUEST_STATUS.IDLE,
  error: null,
};

export const pickUpPointSlice = createSlice({
  name: "pickuppoints",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetStatus: (state, action) => {
      state[action.payload] = REQUEST_STATUS.IDLE;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPickupPoints.fulfilled, (state, action) => {
        state.fetchStatus = REQUEST_STATUS.SUCCEEDED;
        state.pickuppoints = action.payload ?? [];
      })
      .addCase(fetchPickupPoints.rejected, (state, action) => {
        state.fetchStatus = REQUEST_STATUS.FAILED;
        state.error = action.payload.message ?? "Something went wrong";
      })
      .addCase(addPickUpPoints.pending, (state) => {
        state.addStatus = REQUEST_STATUS.LOADING;
        state.error = null;
      })
      .addCase(addPickUpPoints.fulfilled, (state, action) => {
        state.addStatus = REQUEST_STATUS.SUCCEEDED;
        state.pickuppoints.push(action.payload);
      })
      .addCase(addPickUpPoints.rejected, (state, action) => {
        state.addStatus = REQUEST_STATUS.FAILED;
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(deletePickUpPoint.pending, (state) => {
        state.deleteStatus = REQUEST_STATUS.LOADING;
        state.error = null;
      })
      .addCase(deletePickUpPoint.fulfilled, (state, action) => {
        state.deleteStatus = REQUEST_STATUS.SUCCEEDED;
        const id = action.payload;
        state.pickuppoints = state.pickuppoints.filter(
          (point) => point.id !== id
        );
      })
      .addCase(deletePickUpPoint.rejected, (state, action) => {
        state.deleteStatus = REQUEST_STATUS.FAILED;
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(updatePickUpPoints.pending, (state) => {
        state.updateStatus = REQUEST_STATUS.LOADING;
        state.error = null;
      })
      .addCase(updatePickUpPoints.fulfilled, (state, action) => {
        state.updateStatus = REQUEST_STATUS.SUCCEEDED;
        const updatedPoint = action.payload;
        state.pickuppoints = state.pickuppoints.map((point) =>
          point.id === updatedPoint.id ? updatedPoint : point
        );
      })
      .addCase(updatePickUpPoints.rejected, (state, action) => {
        state.updateStatus = REQUEST_STATUS.FAILED;
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(addBulkPickUpPoints.pending, (state) => {
        state.addBulkStatus = REQUEST_STATUS.LOADING;
        state.error = null;
      })
      .addCase(addBulkPickUpPoints.fulfilled, (state, action) => {
        state.addBulkStatus = REQUEST_STATUS.SUCCEEDED;
        state.pickuppoints = state.pickuppoints.concat(action.payload);

      })
      .addCase(addBulkPickUpPoints.rejected, (state, action) => {
        state.error = action.error.message ?? "Something went wrong";
        state.addBulkStatus = REQUEST_STATUS.FAILED;
      });

  },
});

export default pickUpPointSlice.reducer;

export const { clearError, resetStatus } = pickUpPointSlice.actions;
