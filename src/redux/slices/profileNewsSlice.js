import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showNotification } from "./notificationSlice";
import axios from "axios";
// import { cacheData, getCachedData } from "../../utils/cacheUtils";
import { publicNewsRemoved, publicNewsUpdated } from "./publicNewsSlice";
import getUserIdFromToken from "../../utils/getUserIdFromToken";

const BASE_URL = "https://it-park.kz/kk/api";

export const fetchProfileNews = createAsyncThunk(
  "profileNews/fetchProfileNews",
  async (_, thunkAPI) => {
    const userId = getUserIdFromToken();

    if (!userId) {
      const message = "Не удалось получить индентификатор пользователя";
      thunkAPI.dispatch(showNotification({ message, type: "error" }));
      return thunkAPI.rejectWithValue(message);
    }

    try {
      const response = await axios.get(`${BASE_URL}/news?user_id=${userId}`);
      const profileNews = Object.values(response.data).filter(
        (item) => typeof item === "object" && item.id
      );

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
      return thunkAPI.rejectWithValue("Ошибка при создании новости");
    }
  }
);

export const editProfileNews = createAsyncThunk(
  "profileNews/editProfileNews",
  async ({ id, data }, thunkAPI) => {
    const token = localStorage.getItem("jwtToken");

    const formData = new FormData();
    formData.append("title_ru", data.title_ru);
    formData.append("title_kk", data.title_kk);
    formData.append("content_ru", data.content_ru);
    formData.append("content_kk", data.content_kk);
    formData.append("desc_ru", data.desc_ru);
    formData.append("desc_kk", data.desc_kk);
    formData.append("date", data.date);
    formData.append("status", data.status);

    if (data.file) {
      formData.append("file", data.file);
    }
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

const profileNewsSlice = createSlice({
  name: "profileNews",
  initialState: {
    news: [],
    currentProfileNews: null,
    fetchStatus: "idle",
    createStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle",
    error: null,
  },
  reducers: {
    setCurrentProfileNews: (state, action) => {
      state.currentProfileNews = state.news.find(
        (news) => news.id === action.payload
      );
    },
    profileNewsAdded: (state, action) => {
      state.news.push(action.payload);
      //   cacheData(PROFILE_NEWS_CACHE_KEY, state.news);
    },
    profileNewsUpdated: (state, action) => {
      const index = state.news.findIndex(
        (news) => news.id === action.payload.id
      );
      if (index !== -1) {
        state.news[index] = { ...state.news[index], ...action.payload };
      }
    },
    profileNewsDeleted: (state, action) => {
      state.news = state.news.filter((news) => news.id !== action.payload);
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
      })
      .addCase(deleteProfileNews.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setCurrentProfileNews,
  profileNewsAdded,
  profileNewsUpdated,
  profileNewsDeleted,
} = profileNewsSlice.actions;
export default profileNewsSlice.reducer;
export const selectProfileNews = (state) => state.profileNews.news;
export const selectCurrentProfileNews = (state) =>
  state.profileNews.currentProfileNews;
export const selectProfileNewsFetchStatus = (state) =>
  state.profileNews.fetchStatus;
export const selectProfileNewsCreateStatus = (state) =>
  state.profileNews.createStatus;
export const selectProfileNewsUpdateStatus = (state) =>
  state.profileNews.updateStatus;
export const selectProfileNewsDeleteStatus = (state) =>
  state.profileNews.deleteStatus;
export const selectProfileNewsError = (state) => state.profileNews.error;
