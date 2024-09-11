import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCachedData, cacheData } from "../../utils/cacheUtils";

const CACHE_KEY = "cachedNews";
const BASE_URL = "https://it-park.kz/ru/api";

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const cachedNews = getCachedData(CACHE_KEY);
  console.log(cachedNews);

  if (cachedNews) {
    const response = await axios.get(`${BASE_URL}/news`);
    const news = response.data;

    if (news.length !== cachedNews.length) {
      cacheData(CACHE_KEY, news);
      return news;
    }

    return cachedNews;
  }

  const response = await axios.get(`${BASE_URL}/news`);
  const news = response.data;

  cacheData(CACHE_KEY, news);

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

// const BASE_URL = "https://it-park.kz/ru/api";
// const API_URL = "https://it-park.kz/kk/news/view?id=";

// const getCachedNews = () => {
//   const cachedData = localStorage.getItem(CACHE_KEY);
//   if (cachedData) {
//     const { events, timestamp } = JSON.parse(cachedData);
//     const isCacheValid = Date.now() - timestamp < CACHE_TIMEOUT;
//     if (isCacheValid) {
//       return events;
//     }
//   }
//   return null;
// };

// const cacheNews = (news) => {
//   localStorage.setItem(
//     CACHE_KEY,
//     JSON.stringify({ news, timestamp: Date.now() })
//   );
// };

// export const incrementViews = createAsyncThunk(
//   "news/incrementViews",
//   async (newsId) => {
//     await axios.get(`${API_URL}${newsId}`);
//     // После увеличения просмотров получаем обновленные данные
//     const response = await axios.get(`${BASE_URL}/news`);
//     console.log("VIEW");
//     return { id: newsId, updatedNews: response.data };
//   }
// );

// state.currentNews = action.payload.find(
//   (news) => news.id === parseInt(action.meta.arg)
// );

// .addCase(incrementViews.fulfilled, (state, action) => {
//   const { id, updatedNews } = action.payload;
//   state.news = updatedNews; // Перезаписываем все новости обновленным массивом
//   // Также обновляем текущую новость, если она совпадает
//   if (state.currentNews?.id === id) {
//     state.currentNews = state.news.find((news) => news.id === id);
//   }
//   cacheNews(state.news); // Обновляем кэш
// });
