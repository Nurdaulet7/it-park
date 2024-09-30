import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCachedData, cacheData, clearCache } from "../../utils/cacheUtils";
import { showNotification } from "./notificationSlice";
import axios from "axios";

// const PUBLIC_NEWS_CACHE_KEY = "cachedPublicNews";
const BASE_URL = "https://it-park.kz/ru/api";
const PUBLIC_NEWS_CACHE_KEY = "cachedPublicNews";

export const fetchPublicNews = createAsyncThunk(
  "publicNews/fetchPublicNews",
  async ({ forceRefresh = false } = {}, thunkAPI) => {
    const cachedNews = getCachedData(PUBLIC_NEWS_CACHE_KEY);

    if (!forceRefresh && cachedNews) {
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
    currentNews: null,
    fetchStatus: "idle",
    error: null,
  },
  reducers: {
    setCurrentPublicNews: (state, action) => {
      state.currentNews = state.news.find((news) => news.id === action.payload);
    },
    publicNewsUpdated: (state, action) => {
      const index = state.news.findIndex(
        (news) => news.id === action.payload.id
      );
      if (index !== -1) {
        state.news[index] = { ...state.news[index], ...action.payload };
      } else {
        state.news.push(action.payload);
      }
      //   clearCache(PUBLIC_NEWS_CACHE_KEY); // Очищаем кэш после обновления
    },
    publicNewsRemoved: (state, action) => {
      state.news = state.news.filter((news) => news.id !== action.payload);
      //   clearCache(PUBLIC_NEWS_CACHE_KEY); // Очищаем кэш после обновления
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

export const { setCurrentPublicNews, publicNewsUpdated, publicNewsRemoved } =
  publicNewsSlice.actions;
export default publicNewsSlice.reducer;
export const selectPublicNews = (state) => state.publicNews.news;
export const selectCurrentPublicNews = (state) => state.publicNews.currentNews;
export const selectPublicNewsFetchStatus = (state) =>
  state.publicNews.fetchStatus;
export const selectPublicNewsError = (state) => state.publicNews.error;
