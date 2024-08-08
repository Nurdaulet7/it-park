import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://it-park.kz/ru/api";

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await axios.get(`${BASE_URL}/news`);
  return response.data;
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
        state.currentNews = action.payload.find(
          (news) => news.id === parseInt(action.meta.arg)
        );
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
