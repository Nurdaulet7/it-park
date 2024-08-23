// src/redux/slices/eventsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://it-park.kz/ru/api";
const CACHE_KEY = "cachedEvents"; // Ключ для хранения данных в localStorage
const CACHE_TIMEOUT = 10 * 60 * 1000;

const getCachedEvents = () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (cachedData) {
    const { events, timestamp } = JSON.parse(cachedData);
    const isCacheValid = Date.now() - timestamp < CACHE_TIMEOUT;
    if (isCacheValid) {
      return events;
    }
  }
  return null;
};

const cacheEvents = (events) => {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ events, timestamp: Date.now() })
  );
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const cachedEvents = getCachedEvents();

  if (cachedEvents) {
    const response = await axios.get(`${BASE_URL}/events`);
    const events = response.data;

    if (events.length !== cachedEvents.length) {
      cacheEvents(events);
      return events;
    }

    return cachedEvents;
  }

  const response = await axios.get(`${BASE_URL}/events`);
  const events = response.data;

  cacheEvents(events);

  return events;
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
