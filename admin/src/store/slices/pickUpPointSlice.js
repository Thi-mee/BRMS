import { createSlice } from "@reduxjs/toolkit";
import { fetchPickupPoints, addPickUpPoints } from "../thunks/pickUpPointThunks";

const initialState = {
    pickuppoints: [],
    status: "idle",
    error: null
}

export const pickUpPointSlice = createSlice({
    name: "pickuppoints",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
          .addCase(fetchPickupPoints.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchPickupPoints.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.pickuppoints = action.payload
          })
          .addCase(fetchPickupPoints.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
          })
          .addCase(addPickUpPoints.fulfilled, (state, action) => {
            state.pickuppoints.push(action.payload)
          })
      }
})


export default pickUpPointSlice.reducer