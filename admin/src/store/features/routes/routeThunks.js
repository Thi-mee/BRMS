import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall, getAxiosInstance } from "../../../utils/api";

const apiEndPoint = "http://localhost:5000/api/routes";
const actionTypes = {
  FETCH_ROUTES: "routes/fetch",
  ADD_ROUTES: "routes/add",
  DELETE_ROUTE: "routes/delete",
  UPDATE_ROUTES: "routes/update",
  MAP_ROUTES: "routes/map",
  FETCH_MAP_ROUTES: "routes/fetch/map"
}

const api = getAxiosInstance(apiEndPoint);

export const fetchRoutes = createAsyncThunk(
  actionTypes.FETCH_ROUTES,
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCall(api, "", "get", {});
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.message);
    }
  }
);

export const addRoute = createAsyncThunk(
  actionTypes.ADD_ROUTES,
  async (form) => {
    const response = await apiCall(api, "", "post", form);
    return response.data;
  }
);

export const deleteRoute = createAsyncThunk(
  actionTypes.DELETE_ROUTE,
  async (id) => {
    const response = await apiCall(api, `/${id}`, "delete", {});
    return response.data;
  }
);

export const updateRoute = createAsyncThunk(
  actionTypes.UPDATE_ROUTES,
  async (form) => {
    const response = await apiCall(api, `/${form.id}`, "put", form);
    return response.data;
  }
);

// export const mapRoutes = createAsyncThunk(
//   actionTypes.MAP_ROUTES,
//   async (id) => {
//     const response = await apiCall(api, `/${id}/map`, "put", {});
//     return response.data;
//   });

export const mapRoutes = createAsyncThunk(
  actionTypes.MAP_ROUTES,
  async ({ id, arrayOfItems }) => { // Accept an object with 'id' and 'arrayOfItems'
    console.log(id)
    const response = await apiCall(api, `/${id}/map`, 'put',  arrayOfItems ); // Pass 'arrayOfItems' to the API call
    return response.data;
  }
);

export const fetchMappedRoutes = createAsyncThunk(
  actionTypes.FETCH_MAP_ROUTES,
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCall(api, "/map", "get", {});
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.message);
    }
  }
);