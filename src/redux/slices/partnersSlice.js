// src/redux/slices/partnersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://it-park.kz/ru/api";

export const fetchPartners = createAsyncThunk(
  "partners/fetchPartners",
  async () => {
    const response = await axios.get(`${BASE_URL}/partner`);
    return response.data;
  }
);

const partnersSlice = createSlice({
  name: "partners",
  initialState: {
    partners: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.partners = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default partnersSlice.reducer;
