import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getUserIdFromToken from "../../utils/getUserIdFromToken";
import { showNotification } from "./notificationSlice";
import axios from "axios";

const BASE_URL = "https://it-park.kz/kk/api";

export const fetchProfileEvents = createAsyncThunk(
  "profileEvents/fetchProfileEvents",
  async (_, thunkAPI) => {
    const userId = getUserIdFromToken();

    if (!userId) {
      const message = "Не удалось получить индентификатор пользователя";
      thunkAPI.dispatch(showNotification({ message, type: "error" }));
      return thunkAPI.rejectWithValue(message);
    }

    try {
      const response = await axios.get(
        `https://it-park.kz/kk/api/events?user_id=${userId}`
      );
      const profileEvents = Object.values(response.data).filter(
        (item) => typeof item === "object" && item.id
      );

      return profileEvents;
    } catch (error) {
      const message =
        error.response?.message || "Ошибка заргрузка мероприятий профиля";
      thunkAPI.dispatch(showNotification({ message, type: "error" }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const profileEventsSlice = createSlice({
  name: "profileEvents",
  initialState: {
    events: [],
    currentProfileEvent: null,
    fetchStatus: "idle",
    error: null,
  },
  reducers: {
    setCurrentProfileEvent: (state, action) => {
      state.currentProfileEvent = state.events.find(
        (event) => event.id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileEvents.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchProfileEvents.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchProfileEvents.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentProfileEvent } = profileEventsSlice.actions;
export default profileEventsSlice.reducer;
export const selectProfileEvents = (state) => state.profileEvents.events;
export const selectCurrentProfileEvent = (state) =>
  state.profileEvents.currentProfileEvent;
export const selectProfileEventsFetchStatus = (state) =>
  state.profileEvents.fetchStatus;
export const selectProfileEventsError = (state) => state.profileEvents.error;
