import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCachedData, cacheData } from "../../utils/cacheUtils";
import defaultImg from "../../images/itpark_default.png";
import { showNotification } from "./notificationSlice";

const CACHE_KEY = "cachedNews";
const BASE_URL = "https://it-park.kz/ru/api";

const handleApiError = (error, thunkAPI, errorMessage) => {
  const message = error.response?.message || errorMessage || error.message;
  thunkAPI.dispatch(showNotification({ message: message, type: error }));
  return thunkAPI.rejectWithValue(message);
};

const notifySuccess = (thunkAPI, message) => {
  thunkAPI.dispatch(showNotification({ message: message, type: "success" }));
};

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, thunkAPI) => {
    const cachedNews = getCachedData(CACHE_KEY);

    try {
      const response = await axios.get(`${BASE_URL}/news`);
      const news = response.data;

      if (!cachedNews || news.length !== cachedNews.length) {
        cacheData(CACHE_KEY, news);
        return news;
      }
      notifySuccess(thunkAPI, "Новости загружены");
      return cachedNews;
    } catch (error) {
      return handleApiError(error, thunkAPI, "Ошибка загрузки новостей");
    }
  }
);

export const createNews = createAsyncThunk(
  "news/createNews",
  async (newsData, thunkAPI) => {
    const token = localStorage.getItem("jwtToken");
    const formData = new FormData();
    Object.entries(newsData).forEach(([key, value]) => {
      formData.append(key, value || (key === "file" ? defaultImg : ""));
    });
    formData.append("token", token);

    try {
      const response = await axios.post(
        `https://it-park.kz/kk/api/create?table=news`,
        formData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editNews = createAsyncThunk(
  "news/editNews",
  async ({ id, newsData }, thunkAPI) => {
    const token = localStorage.getItem("jwtToken");

    const formData = new FormData();
    formData.append("title_ru", newsData.title_ru);
    formData.append("title_kk", newsData.title_kk);
    formData.append("content_ru", newsData.content_ru);
    formData.append("content_kk", newsData.content_kk);
    formData.append("desc_ru", newsData.desc_ru);
    formData.append("desc_kk", newsData.desc_kk);
    formData.append("date", newsData.date);
    formData.append("status", newsData.status);

    if (newsData.file) {
      formData.append("file", newsData.file);
    }

    formData.append("token", token);

    try {
      const response = await axios.post(
        `https://it-park.kz/kk/api/update?table=news&post_id=${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Ошибка обновления новости"
      );
    }
  }
);

export const deleteNews = createAsyncThunk(
  "news/deleteNews",
  async ({ entityId, entityType }, thunkAPI) => {
    const token = localStorage.getItem("jwtToken");

    const formData = new FormData();
    formData.append("token", token);

    try {
      await axios.post(
        `https://it-park.kz/kk/api/trash?table=${entityType}&post_id=${entityId}`,
        formData
      );
      thunkAPI.dispatch(
        showNotification({ message: "Новость удалена", type: "success" })
      );
      return entityId;
    } catch (error) {
      thunkAPI.dispatch(
        showNotification({ message: "Ошибка удаления новости", type: "error" })
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    currentNews: null,
    fetchStatus: "idle",
    createStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle",
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
        state.fetchStatus = "loading";
        showNotification({ message: "Загрузка новостей...", type: "info" });
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error.message;
      })

      // Добавление новости (createNews)
      .addCase(createNews.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        if (action.payload.status === 1) {
          state.news.push(action.payload);
          cacheData(CACHE_KEY, state.news);
        }
      })
      .addCase(createNews.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload || "Ошибка при создании новости";
      })

      //Updating news
      .addCase(editNews.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(editNews.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.news.findIndex(
          (news) => news.id === action.payload.id
        );

        if (index !== -1) {
          if (action.payload.status === 1) {
            state.news[index] = {
              ...state.news[index],
              ...action.payload,
            };
          } else {
            state.news = state.news.filter(
              (news) => news.id !== action.payload.id
            );
          }
        } else {
          if (action.payload.status === 1) {
            state.news.push(action.payload);
          }
        }

        cacheData(CACHE_KEY, state.news);
      })
      .addCase(editNews.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload || "Ошибка при обновлении новости";
      })

      //Deleting news
      .addCase(deleteNews.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.news = state.news.filter((news) => news.id !== action.payload);
        cacheData(CACHE_KEY, state.news);
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload || "Error during deleting news";
      });
  },
});

export const { setCurrentNews } = newsSlice.actions;

export default newsSlice.reducer;

export const selectNews = (state) => state.news.news;
export const selectNewsError = (state) => state.news.error;
export const selectCurrentNews = (state) => state.news.currentNews;
export const selectNewsStatus = (state) => state.news.fetchStatus;
export const selectCreateStatus = (state) => state.news.createStatus;
export const selectDeleteStatus = (state) => state.news.deleteStatus;
export const selectUpdateStatus = (state) => state.news.updateStatus;
