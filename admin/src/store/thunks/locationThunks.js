import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall, getAxiosInstance } from "../../utils/api";

const apiEndPoints = 'http://localhost:5000/api/location'

const api = getAxiosInstance(apiEndPoints);

export const fetchAllLocations = createAsyncThunk('locations/fetch', async (_, { rejectWithValue }) => {
    try {
        const response = await apiCall(api, '', 'get', {});
        return response.data;
    } catch (error) {
        rejectWithValue(error.message)
    }
});

// delete location thunk
export const deleteLocation = createAsyncThunk('locations/delete', async (id, { rejectWithValue }) => {
    try {
        const response = await apiCall(api, `/${id}`, 'delete', {});
        return response.data;
    } catch (error) {
        rejectWithValue(error)
        throw error;
    }
})

// edit location thunk
export const editLocation = createAsyncThunk('locations/edit', async (location) => {
    const response = await apiCall(api, `/${location.id}`, 'put', location);
    return response.data;
})