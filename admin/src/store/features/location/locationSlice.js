import { createSlice } from "@reduxjs/toolkit";
import { fetchAllLocations, deleteLocation, editLocation, addLocation } from "./locationThunks";
import { REQUEST_STATUS } from "../../../utils/constants";

const initialState = {
  locations: [],
  fetchStatus: REQUEST_STATUS.LOADING,
  deleteStatus: REQUEST_STATUS.IDLE,
  editStatus: REQUEST_STATUS.IDLE,
  addStatus: REQUEST_STATUS.IDLE,
  error: null,
}

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    clearError: (state, action) => {
      state.error = null;
    },
    resetStatus: (state, action) => {
      state[action.payload] = REQUEST_STATUS.IDLE;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllLocations.fulfilled, (state, action) => {
        state.fetchStatus = REQUEST_STATUS.SUCCEEDED
        state.locations = action.payload
      })
      .addCase(fetchAllLocations.rejected, (state, action) => {
        state.fetchStatus = REQUEST_STATUS.FAILED
        state.error = action.error.message
      })
      .addCase(deleteLocation.pending, (state) => {
        state.deleteStatus = REQUEST_STATUS.LOADING
        state.error = null
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.deleteStatus = REQUEST_STATUS.SUCCEEDED;
        state.locations = state.locations.filter(location => location.id !== action.payload.id)
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.deleteStatus = REQUEST_STATUS.FAILED
        state.error = action.error.message
      })
      .addCase(editLocation.pending, (state) => {
        state.editStatus = REQUEST_STATUS.LOADING
        state.error = null
      })
      .addCase(editLocation.fulfilled, (state, action) => {
        state.editStatus = REQUEST_STATUS.SUCCEEDED
        state.locations = state.locations.map(location => location.id === action.payload.id ? action.payload : location)
      })
      .addCase(editLocation.rejected, (state, action) => {
        state.editStatus = REQUEST_STATUS.FAILED
        state.error = action.error.message
      })
      .addCase(addLocation.pending, (state) => {
        state.addStatus = REQUEST_STATUS.LOADING
        state.error = null
      })
      .addCase(addLocation.fulfilled, (state, action) => {
        state.addStatus = REQUEST_STATUS.SUCCEEDED
        state.locations.push(action.payload)
      })
      .addCase(addLocation.rejected, (state, action) => {
        state.addStatus = REQUEST_STATUS.FAILED
        state.error = action.error.message
      })
  }
})

export default locationSlice.reducer;

export const { clearError, resetStatus } = locationSlice.actions;