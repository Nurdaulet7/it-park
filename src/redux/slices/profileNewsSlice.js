import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showNotification } from "./notificationSlice";
import axios from "axios";
import { cacheData, getCachedData } from "../../utils/cacheUtils";
import { publicNewsRemoved, publicNewsUpdated } from "./publicNewsSlice";

const BASE_URL = "https://it-park.kz/kk/api";
const PROFILE_NEWS_CACHE_KEY = "cachedProfileNews";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("jwtToken");

  if (!token) return null;

  const tokenParts = token.split(".");

  if (tokenParts.length !== 3) return null;

  const payloadBase64 = tokenParts[1];
  const payloadDecoded = atob(payloadBase64);
  const payloadObject = JSON.parse(payloadDecoded);

  return payloadObject.user?.id || null;
};

export const fetchProfileNews = createAsyncThunk(
  "profileNews/fetchProfileNews",
  async (_, thunkAPI) => {
    const userId = getUserIdFromToken();

    if (!userId) {
      const message = "Не удалось получить индентификатор пользователя";
      thunkAPI.dispatch(showNotification({ message, type: "error" }));
      return thunkAPI.rejectWithValue(message);
    }

    const cachedProfileNews = getCachedData(PROFILE_NEWS_CACHE_KEY);

    if (cachedProfileNews) {
      return cachedProfileNews;
    }

    try {
      const response = await axios.get(
        `https://it-park.kz/kk/api/new?user_id=${userId}`
      );
      const profileNews = response.data;

      cacheData(PROFILE_NEWS_CACHE_KEY, profileNews);
      return profileNews;
    } catch (error) {
      const message =
        error.response?.message || "Ошибка заргрузка новестей профиля";
      thunkAPI.dispatch(showNotification({ message, type: "error" }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProfileNews = createAsyncThunk(
  "profileNews/createProfileNews",
  async (newsData, thunkAPI) => {
    const token = localStorage.getItem("jwtToken");

    const formData = new FormData();
    Object.entries(newsData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("token", token);

    try {
      const response = await axios.post(
        `${BASE_URL}/create?table=news`,
        formData
      );
      const newNews = response.data;

      thunkAPI.dispatch(profileNewsAdded(newNews));

      if (newNews.status === 1) {
        thunkAPI.dispatch(publicNewsUpdated(newNews));
      }
      return newNews;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка создания новости");
    }
  }
);

export const editProfileNews = createAsyncThunk(
  "profileNews/editProfileNews",
  async ({ id, newsData }, thunkAPI) => {
    const token = localStorage.getItem("jwtToken");

    const formData = new FormData();
    Object.entries(newsData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("token", token);

    try {
      const response = await axios.post(
        `${BASE_URL}/update?table=news&post_id=${id}`,
        formData
      );
      const updatedNews = response.data;

      thunkAPI.dispatch(profileNewsUpdated(updatedNews));

      if (updatedNews.status === 1) {
        thunkAPI.dispatch(publicNewsUpdated(updatedNews));
      } else {
        thunkAPI.dispatch(publicNewsRemoved(id));
      }

      return updatedNews;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка обновления новости");
    }
  }
);

export const deleteProfileNews = createAsyncThunk(
  "profileNews/deleteProfileNews",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("jwtToken");

    try {
      await axios.post(`${BASE_URL}/trash?table=news&post_id=${id}`, { token });
      thunkAPI.dispatch(profileNewsDeleted(id));
      thunkAPI.dispatch(publicNewsRemoved(id));
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка удаления новости");
    }
  }
);

const profileNewsSlice = createSlice({
  name: "profileNews",
  initialState: {
    news: [],
    fetchStatus: "idle",
    createStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle",
    error: null,
  },
  reducers: {
    profileNewsAdded: (state, action) => {
      state.news.push(action.payload);
      cacheData(PROFILE_NEWS_CACHE_KEY, state.news);
    },
    profileNewsUpdated: (state, action) => {
      const index = state.news.findIndex(
        (news) => news.id === action.payload.id
      );
      if (index !== -1) {
        state.news[index] = { ...state.news[index], ...action.payload };
        cacheData(PROFILE_NEWS_CACHE_KEY, state.news);
      }
    },
    profileNewsDeleted: (state, action) => {
      state.news = state.news.filter((news) => news.id !== action.payload);
      cacheData(PROFILE_NEWS_CACHE_KEY, state.news);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileNews.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchProfileNews.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.news = action.payload;
      })
      .addCase(fetchProfileNews.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error.message;
      })

      //Create news
      .addCase(createProfileNews.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createProfileNews.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.news.push(action.payload);
        cacheData(PROFILE_NEWS_CACHE_KEY, state.news);
      })
      .addCase(createProfileNews.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.error.message;
      })

      //Edit news
      .addCase(editProfileNews.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(editProfileNews.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.news.findIndex(
          (news) => news.id === action.payload.id
        );
        if (index !== -1) {
          state.news[index] = { ...state.news[index], ...action.payload };
        }
        cacheData(PROFILE_NEWS_CACHE_KEY, state.news);
      })
      .addCase(editProfileNews.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteProfileNews.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteProfileNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = state.news.filter((news) => news.id !== action.payload);
        cacheData(PROFILE_NEWS_CACHE_KEY, state.news);
      })
      .addCase(deleteProfileNews.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { profileNewsAdded, profileNewsUpdated, profileNewsDeleted } =
  profileNewsSlice.actions;
export default profileNewsSlice.reducer;