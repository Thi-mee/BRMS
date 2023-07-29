import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall, getAxiosInstance } from "../../../utils/api";

const apiEndPoint = "http://localhost:5000/api/routes";
const actionTypes = {
  FETCH_ROUTES: "routes/fetch",
  ADD_ROUTES: "routes/add",
  DELETE_ROUTE: "routes/delete",
  UPDATE_ROUTES: "routes/update",
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
    await apiCall(api, `/${id}`, "delete", {});
    return id;
  }
);

export const updateRoute = createAsyncThunk(
  actionTypes.UPDATE_ROUTES,
  async (form) => {
    const response = await apiCall(api, `/${form.id}`, "put", form);
    return response.data;
  }
);