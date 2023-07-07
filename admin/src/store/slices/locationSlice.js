import { createSlice } from "@reduxjs/toolkit";
import { fetchAllLocations } from "../thunks/locationThunks";

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
      }
})

export default locationSlice.reducer;