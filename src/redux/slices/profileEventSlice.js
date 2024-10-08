import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getUserIdFromToken from "../../utils/getUserIdFromToken";
import { showNotification } from "./notificationSlice";
import axios from "axios";
import {
  fetchPublicEvents,
  publicEventsRemoved,
  publicEventsUpdated,
} from "./publicEventsSlice";

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
      const response = await axios.get(`${BASE_URL}/events?user_id=${userId}`);
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

export const createProfileEvent = createAsyncThunk(
  "profileEvents/createProfileEvent",
  async (eventData, thunkAPI) => {
    const token = localStorage.getItem("jwtToken");

    const formData = new FormData();
    Object.entries(eventData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("token", token);

    try {
      const response = await axios.post(
        `${BASE_URL}/create?table=events`,
        formData
      );
      const newEvent = response.data;
      thunkAPI.dispatch(profileEventAdded(newEvent));

      if (newEvent.status === 1) {
        thunkAPI.dispatch(publicEventsUpdated(newEvent));
      }
      return newEvent;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка при создании мероприятии");
    }
  }
);

export const editProfileEvent = createAsyncThunk(
  "profileNews/editProfileEvent",
  async ({ id, eventData }, thunkAPI) => {
    const token = localStorage.getItem("jwtToken");

    const formData = new FormData();
    formData.append("title_ru", eventData.title_ru);
    formData.append("title_kk", eventData.title_kk);
    formData.append("content_ru", eventData.content_ru);
    formData.append("content_kk", eventData.content_kk);
    formData.append("location_ru", eventData.location_ru);
    formData.append("location_kk", eventData.location_kk);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("status", eventData.status);

    if (eventData.file) {
      formData.append("file", eventData.file);
    }
    formData.append("token", token);

    try {
      const response = await axios.post(
        `${BASE_URL}/update?table=events&post_id=${id}`,
        formData
      );
      const updatedEvent = response.data;

      thunkAPI.dispatch(profileEventUpdated(updatedEvent));

      if (updatedEvent.status === 1) {
        thunkAPI.dispatch(publicEventsUpdated(updatedEvent));
      } else {
        thunkAPI.dispatch(publicEventsRemoved(id));
      }

      return updatedEvent;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка обновления мероприятий");
    }
  }
);

export const deleteProfileEvent = createAsyncThunk(
  async ({ entityId, entityType }, thunkAPI) => {
    const token = localStorage.getItem("jwtToken");

    const formData = new FormData();
    formData.append("token", token);

    try {
      await axios.post(
        `${BASE_URL}/trash?table=${entityType}&post_id=${entityId}`,
        formData
      );
      thunkAPI.dispatch(
        showNotification({ message: "Мероприятия удалена", type: "success" })
      );
      thunkAPI.dispatch(publicEventsRemoved(entityId));
      return entityId;
    } catch (error) {
      thunkAPI.dispatch(
        showNotification({
          message: "Ошибка удаления мероприятий",
          type: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const profileEventsSlice = createSlice({
  name: "profileEvents",
  initialState: {
    events: [],
    currentProfileEvent: null,
    fetchStatus: "idle",
    createStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle",
    error: null,
  },
  reducers: {
    setCurrentProfileEvent: (state, action) => {
      state.currentProfileEvent = state.events.find(
        (event) => event.id === action.payload
      );
    },
    profileEventAdded: (state, action) => {
      state.events.push(action.payload);
    },
    profileEventUpdated: (state, action) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id
      );
      if (index !== -1) {
        state.events[index] = { ...state.events[index], ...action.payload };
      }
    },
    profileEventDeleted: (state, action) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
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
      })

      .addCase(editProfileEvent.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(editProfileEvent.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.events.findIndex(
          (event) => event.id === action.payload.id
        );
        if (index !== -1) {
          state.events[index] = { ...state.events[index], ...action.payload };
        }
      })
      .addCase(editProfileEvent.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteProfileEvent.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteProfileEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = state.events.filter(
          (event) => event.id !== action.payload
        );
      })
      .addCase(deleteProfileEvent.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setCurrentProfileEvent,
  profileEventUpdated,
  profileEventAdded,
  profileEventDeleted,
} = profileEventsSlice.actions;
export default profileEventsSlice.reducer;
export const selectProfileEvents = (state) => state.profileEvents.events;
export const selectCurrentProfileEvent = (state) =>
  state.profileEvents.currentProfileEvent;
export const selectProfileEventsFetchStatus = (state) =>
  state.profileEvents.fetchStatus;
export const selectProfileEventsCreateSatatus = (state) =>
  state.profileEvents.createStatus;
export const selectProfileEventsUpdateStatus = (state) =>
  state.profileEvents.updateStatus;
export const selectProfileEventsDeleteStatus = (state) =>
  state.profileEvents.deleteStatus;
export const selectProfileEventsError = (state) => state.profileEvents.error;
