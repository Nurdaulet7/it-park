// src/redux/slices/residentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://it-park.kz/ru/api";

export const fetchResidents = createAsyncThunk(
  "residents/fetchResidents",
  async () => {
    const response = await axios.get(`${BASE_URL}/resident`);
    return response.data;
  }
);

const residentsSlice = createSlice({
  name: "residents",
  initialState: {
    residents: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setCurrentResident: (state, action) => {
      state.currentResident = state.residents.find(
        (resident) => resident.id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResidents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchResidents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.residents = action.payload;
      })
      .addCase(fetchResidents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentResident } = residentsSlice.actions;

export default residentsSlice.reducer;
