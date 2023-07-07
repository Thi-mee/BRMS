import {  createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const apiEndpPoint = "http://localhost:5000/api/pickup-points"

export const fetchPickupPoints = createAsyncThunk('pickuppoints/fetch', async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get(apiEndpPoint);
        return response.data.data;
    } catch (err) {
        if(!err.response){
            throw err;
        }
        return rejectWithValue(err.response.message);
    }
});

export const addPickUpPoints = createAsyncThunk('pickuppoints/add', async(form, {rejectWithValue}) => {
    try{
        const response = axios.post(apiEndpPoint, form);
        return response.data
    } catch(err){
        if(!err.response){
            throw err;
        }
        return rejectWithValue(err.response.message);
    }
})

// how about having a global error state in a useContext?
