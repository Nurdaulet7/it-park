import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cacheData, getCachedData } from "../../utils/cacheUtils";
import axios from "axios";
import { showNotification } from "./notificationSlice";

const BASE_URL = "https://it-park.kz/ru/api";
const PUBLIC_EVENTS_CACHE_KEY = "cachedPublicEvents";

export const fetchPublicEvents = createAsyncThunk(
  "publicEvents/fetchPublicEvents",
  async ({ forceRefresh = false } = {}, thunkAPI) => {
    const cachedEvents = getCachedData(PUBLIC_EVENTS_CACHE_KEY);

    if (!forceRefresh && cachedEvents) {
      return cachedEvents;
    }
    try {
      const response = await axios.get(`${BASE_URL}/events`);
      const events = response.data;

      cacheData(PUBLIC_EVENTS_CACHE_KEY, events);
      return events;
    } catch (error) {
      const message = error.response?.message || "Error during fetching events";
      thunkAPI.dispatch(showNotification({ message: message, type: "error" }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const publicEventsSlice = createSlice({
  name: "publicEvents",
  initialState: {
    events: [],
    currentEvent: null,
    fetchStatus: "idle",
    error: null,
  },
  reducers: {
    setCurrentPublicEvent: (state, action) => {
      state.currentEvent = state.events.find(
        (event) => event.id === action.payload
      );
    },
    publicEventsUpdated: (state, action) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id
      );
      if (index !== -1) {
        state.events[index] = { ...state.events[index], ...action.payload };
      } else {
        state.events.push(action.payload);
      }
    },
    publicEventsRemoved: (state, action) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicEvents.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchPublicEvents.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchPublicEvents.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setCurrentPublicEvent,
  publicEventsUpdated,
  publicEventsRemoved,
} = publicEventsSlice.actions;
export default publicEventsSlice.reducer;
export const selectPublicEvents = (state) => state.publicEvents.events;
export const selectCurrentPublicEvent = (state) =>
  state.publicEvents.currentEvent;
export const selectPublicEventsFetchStatus = (state) =>
  state.publicEvents.fetchStatus;
export const selectPublicEventsError = (state) => state.publicEvents.error;
