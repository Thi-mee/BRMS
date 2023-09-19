import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUS } from "../../../utils/constants";
import { addRoute, deleteRoute, fetchRoutes, updateRoute, mapRoutes, fetchMappedRoutes } from "./routeThunks";

const initialState = {
  data: [],
  mappedData: [],
  fetchStatus: REQUEST_STATUS.LOADING,
  deleteStatus: REQUEST_STATUS.IDLE,
  editStatus: REQUEST_STATUS.IDLE,
  addStatus: REQUEST_STATUS.IDLE,
  mapStatus: REQUEST_STATUS.IDLE,
  fetchMapStatus: REQUEST_STATUS.LOADING,
  scheduleStatus: REQUEST_STATUS.IDLE,
  error: null,
};

const routeSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    clearError: (state, action) => {
      state.error = null;
    },
    resetStatus: (state, action) => {
      state[action.payload] = REQUEST_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.fetchStatus = REQUEST_STATUS.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchRoutes.rejected, (state, action) => {
        state.fetchStatus = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(addRoute.pending, (state, action) => {
        state.addStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(addRoute.fulfilled, (state, action) => {
        state.addStatus = REQUEST_STATUS.SUCCEEDED;
        state.data.push(action.payload);
      })
      .addCase(addRoute.rejected, (state, action) => {
        state.addStatus = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(deleteRoute.pending, (state, action) => {
        state.deleteStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(deleteRoute.fulfilled, (state, action) => {
        state.deleteStatus = REQUEST_STATUS.SUCCEEDED;
        state.data = state.data.filter((r) => r.id !== action.payload.id);
      })
      .addCase(deleteRoute.rejected, (state, action) => {
        state.deleteStatus = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(updateRoute.pending, (state, action) => {
        state.editStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(updateRoute.fulfilled, (state, action) => {
        state.editStatus = REQUEST_STATUS.SUCCEEDED;
        state.data = state.data.map((r) =>
          r.id === action.payload.id ? action.payload : r
        );
      })
      .addCase(updateRoute.rejected, (state, action) => {
        state.editStatus = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(mapRoutes.pending, (state, action) => {
        state.mapStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(mapRoutes.fulfilled, (state, action) => {
        state.mapStatus = REQUEST_STATUS.SUCCEEDED;
        state.data = state.data.map((r) =>
          r.id === action.payload.id ? action.payload : r
        );
      })
      .addCase(mapRoutes.rejected, (state, action) => {
        state.mapStatus = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(fetchMappedRoutes.fulfilled, (state, action) => {
        state.fetchMapStatus = REQUEST_STATUS.SUCCEEDED;
        state.mappedData = action.payload;
      })
      .addCase(fetchMappedRoutes.rejected, (state, action) => {
        state.fetchMapStatus = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      })
  },
});

export default routeSlice.reducer;
export const { resetStatus, clearError } =
  routeSlice.actions;
