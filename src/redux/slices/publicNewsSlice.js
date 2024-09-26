import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCachedData, cacheData, clearCache } from "../../utils/cacheUtils";
import { showNotification } from "./notificationSlice";
import axios from "axios";

// const PUBLIC_NEWS_CACHE_KEY = "cachedPublicNews";
const BASE_URL = "https://it-park.kz/ru/api";
const PUBLIC_NEWS_CACHE_KEY = "cachedPublicNews";

export const fetchPublicNews = createAsyncThunk(
  "publicNews/fetchPublicNews",
  async (_, thunkAPI) => {
    const cachedNews = getCachedData(PUBLIC_NEWS_CACHE_KEY);

    if (cachedNews) {
      return cachedNews;
    }

    try {
      const response = await axios.get(`${BASE_URL}/news`);
      const news = response.data;

      cacheData(PUBLIC_NEWS_CACHE_KEY, news);
      return news;
    } catch (error) {
      const message = error.response?.message || "Error during fetching news";
      thunkAPI.dispatch(showNotification({ message: message, type: "error" }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const publicNewsSlice = createSlice({
  name: "publicNews",
  initialState: {
    news: [],
    fetchStatus: "idle",
    error: null,
  },
  reducers: {
    publicNewsUpdated: (state, action) => {
      const index = state.news.findIndex(
        (news) => news.id === action.payload.id
      );
      if (index !== -1) {
        state.news[index] = { ...state.news[index], ...action.payload };
      } else {
        state.news.push(action.payload);
      }
      cacheData(PUBLIC_NEWS_CACHE_KEY, state.news);
    },
    publicNewsRemoved: (state, action) => {
      state.news = state.news.filter((news) => news.id !== action.payload);
      cacheData(PUBLIC_NEWS_CACHE_KEY, state.news);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicNews.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchPublicNews.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.news = action.payload;
      })
      .addCase(fetchPublicNews.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { publicNewsUpdated, publicNewsRemoved } = publicNewsSlice.actions;
export default publicNewsSlice.reducer;
