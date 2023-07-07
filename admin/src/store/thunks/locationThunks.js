import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndPoints = 'http://localhost:5000/api/location'

export const fetchAllLocations = createAsyncThunk ('locations/fetch', async () => {
    try{
        const response = await axios.get(apiEndPoints);
        return response.data.data;
    } catch(error){
        console.log(error)
    }
})

