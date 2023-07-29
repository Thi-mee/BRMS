import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUS } from "../../../utils/constants";
import mockData from "./mockData.json";
import { addRoute, deleteRoute, fetchRoutes, updateRoute } from "./routeThunks";

const initialState = {
  data: mockData,
  fetchStatus: REQUEST_STATUS.LOADING,
  deleteStatus: REQUEST_STATUS.IDLE,
  editStatus: REQUEST_STATUS.IDLE,
  addStatus: REQUEST_STATUS.IDLE,
  mapStatus: REQUEST_STATUS.IDLE,
  scheduleStatus: REQUEST_STATUS.IDLE,
  error: null,
};

const routeSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    // addRoute: (state, action) => {
    //   state.data.push(action.payload);
    // },
    // deleteRoute: (state, action) => {
    //   state.data = state.data.filter((r) => r.id === action.payload);
    // },
    // editRoute: (state, action) => {
    //   state.data = state.data.map((r) =>
    //     r.id === action.payload.id ? action.payload : r
    //   );
    // },
    // mapRoute: (state, action) => {
    //   throw new Error("Not implemented");
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.fetchStatus = REQUEST_STATUS.SUCCESS;
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
        state.addStatus = REQUEST_STATUS.SUCCESS;
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
        state.deleteStatus = REQUEST_STATUS.SUCCESS;
        state.data = state.data.filter((r) => r.id === action.payload);
      })
      .addCase(deleteRoute.rejected, (state, action) => {
        state.deleteStatus = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(updateRoute.pending, (state, action) => {
        state.editStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(updateRoute.fulfilled, (state, action) => {
        state.editStatus = REQUEST_STATUS.SUCCESS;
        state.data = state.data.map((r) =>
          r.id === action.payload.id ? action.payload : r
        );
      })
      .addCase(updateRoute.rejected, (state, action) => {
        state.editStatus = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      })
    //   .addCase(mapPickupsToRoute.pending, (state, action) => {
    //     state.mapStatus = REQUEST_STATUS.LOADING;
    //   })
    //   .addCase("routes/map/fulfilled", (state, action) => {
    //     state.mapStatus = REQUEST_STATUS.SUCCESS;
    //     state.data = state.data.map((r) =>
    //       r.id === action.payload.id ? action.payload : r
    //     );
    //   })
    //   .addCase("routes/map/rejected", (state, action) => {
    //     state.mapStatus = REQUEST_STATUS.FAILED;
    //     state.error = action.payload;
    //   });
  },
});

export default routeSlice.reducer;
// export const { addRoute, deleteRoute, editRoute, mapRoute } =
//   routeSlice.actions;
