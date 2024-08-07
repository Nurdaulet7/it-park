// src/redux/slices/eventsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://it-park.kz/ru/api";

// Создаем асинхронный thunk для получения событий
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await axios.get(`${BASE_URL}/events`);
  return response.data;
});

// Срез
const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    currentEvent: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setCurrentEvent: (state, action) => {
      state.currentEvent = state.events.find(
        (event) => event.id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
        state.currentEvent = action.payload.find(
          (event) => event.id === parseInt(action.meta.arg)
        );
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentEvent } = eventsSlice.actions;

export default eventsSlice.reducer;

export const selectEvents = (state) => state.events.events;
export const selectEventsStatus = (state) => state.events.status;
export const selectEventsError = (state) => state.events.error;
