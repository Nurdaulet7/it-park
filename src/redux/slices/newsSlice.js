import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://it-park.kz/ru/api";
const CACHE_KEY = "cachedNews";
const CACHE_TIMEOUT = 10 * 60 * 1000;

const getCachedNews = () => {
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

const cacheNews = (news) => {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ news, timestamp: Date.now() })
  );
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const cachedNews = getCachedNews();

  if (cachedNews) {
    const response = await axios.get(`${BASE_URL}/news`);
    const news = response.data;

    if (news.length !== cachedNews.length) {
      cacheNews(news);
      return news;
    }

    return cachedNews;
  }

  const response = await axios.get(`${BASE_URL}/news`);
  const news = response.data;

  cacheNews(news);

  return news;
});

const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    currentNews: null,
    status: "idle",
    error: null,
  },

  reducers: {
    setCurrentNews: (state, action) => {
      state.currentNews = state.news.find((news) => news.id === action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
        // state.currentNews = action.payload.find(
        //   (news) => news.id === parseInt(action.meta.arg)
        // );
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentNews } = newsSlice.actions;

export default newsSlice.reducer;

export const selectNews = (state) => state.news.news;
export const selectNewsStatus = (state) => state.news.status;
export const selectNewsError = (state) => state.news.error;
export const selectCurrentNews = (state) => state.news.currentNews;
