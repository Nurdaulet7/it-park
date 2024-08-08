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
    currentResident: null,
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
        state.currentResident = action.payload.find(
          (resident) => resident.id === parseInt(action.meta.arg)
        );
      })
      .addCase(fetchResidents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentResident } = residentsSlice.actions;

export default residentsSlice.reducer;

export const selectResidents = (state) => state.residents.residents;
export const selectResidentsStatus = (state) => state.residents.status;
export const selectResidentsError = (state) => state.residents.error;
export const selectCurrentResident = (state) => state.residents.currentResident;
