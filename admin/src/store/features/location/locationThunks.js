import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall, getAxiosInstance } from "../../../utils/api";

const apiEndPoints = 'http://localhost:5000/api/locations'

const api = getAxiosInstance(apiEndPoints);

export const fetchAllLocations = createAsyncThunk('locations/fetch', async () => {
    const response = await apiCall(api, '', 'get', {});
    return response.data;
});

// delete location thunk
export const deleteLocation = createAsyncThunk('locations/delete', async (id) => {
    const response = await apiCall(api, `/${id}`, 'delete', {});
    return response.data;
})

// edit location thunk
export const editLocation = createAsyncThunk('locations/edit', async (location) => {
    const response = await apiCall(api, `/${location.id}`, 'put', location);
    return response.data;
});

// add location thunk
export const addLocation = createAsyncThunk('locations/add', async (location) => {
    const response = await apiCall(api, '', 'post', location);
    return response.data;
});