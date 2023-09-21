import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall, getAxiosInstance } from "../../../utils/api";

const apiEndPoint = "http://localhost:5000/api/pickup-points";
const actionTypes = {
  FETCH_PICKUP_POINTS: "pickuppoints/fetch",
  ADD_PICKUP_POINTS: "pickuppoints/add",
  DELETE_PICKUP_POINT: "pickuppoints/delete",
  UPDATE_PICKUP_POINTS: "pickuppoints/update",
  ADD_BULK_PICKUP_POINTS: "pickuppoints/addbulk",
};
const api = getAxiosInstance(apiEndPoint);


export const fetchPickupPoints = createAsyncThunk(
  actionTypes.FETCH_PICKUP_POINTS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCall(api, "", "get", {});
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.message);
    }
  }
);

export const addPickUpPoints = createAsyncThunk(
  actionTypes.ADD_PICKUP_POINTS,
  async (form) => {
    const response = await apiCall(api, "", "post", form);
    return response.data;
  }
);

export const deletePickUpPoint = createAsyncThunk(
  actionTypes.DELETE_PICKUP_POINT,
  async (id) => {
    await apiCall(api, `/${id}`, "delete", {});
    return id;
  }
);

export const updatePickUpPoints = createAsyncThunk(
  actionTypes.UPDATE_PICKUP_POINTS,
  async (form) => {
    const response = await apiCall(api, `/${form.id}`, "put", form);
    return response.data;
  }
);

export const addBulkPickUpPoints = createAsyncThunk(
  actionTypes.ADD_BULK_PICKUP_POINTS,
  async (form) => {
    const response = await apiCall(api, "/bulk", "post", form);
    return response.data;
  }
);