import { createSlice } from "@reduxjs/toolkit";
import { fetchAllLocations, deleteLocation, editLocation } from "../thunks/locationThunks";

const initialState = {
    locations: [],
    status: 'idle',
    error: null
}

export const locationSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
          .addCase(fetchAllLocations.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchAllLocations.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.locations = action.payload
          })
          .addCase(fetchAllLocations.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
          })
          .addCase(deleteLocation.fulfilled, (state, action) => {
            state.status = 'succeeded';
            console.log(action.payload)
            state.locations = state.locations.filter(location => location.id !== action.payload)
          })
          .addCase(deleteLocation.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
          .addCase(editLocation.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.locations = state.locations.map(location => location.id === action.payload.id ? action.payload : location)
          })
      }
})

export default locationSlice.reducer;