import {createSlice} from "@reduxjs/toolkit";
import {REQUEST_STATUS} from "../../../utils/constants";
import mockData from './mockData.json'

const initialState = {
    data: mockData,
    fetchStatus: REQUEST_STATUS.LOADING,
    deleteStatus: REQUEST_STATUS.IDLE,
    editStatus: REQUEST_STATUS.IDLE,
    addStatus: REQUEST_STATUS.IDLE,
    error: null
}

const routeSlice = createSlice({
    name: "routes",
    initialState,
    reducers: {
        addRoute: (state, action) => {
            state.data.push(action.payload)
        },
        deleteRoute: (state, action) => {
            state.data = state.data.filter(r => r.id === action.payload)
        },
        editRoute: (state, action) => {
            state.data = state.data.map(r => r.id === action.payload.id ? action.payload : r)
        },
        mapRoute: (state, action) => {
            throw new Error('Not implemented')
        }
    }
})

export default routeSlice.reducer;
export const {addRoute,deleteRoute,editRoute,mapRoute} = routeSlice.actions