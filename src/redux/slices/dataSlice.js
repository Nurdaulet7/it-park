import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getUserIdFromToken from "../../utils/getUserIdFromToken";
import { cacheData, getCachedData } from "../../utils/cacheUtils";
import axios from "axios";
import { showNotification } from "./notificationSlice";

const BASE_URL = "https://it-park.kz/kk/api";

const CACHE_KEYS = {
  news: "cachedPublicNews",
  events: "cachedPublicEvents",
};

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async ({ entityType, isProfile = false, forceRefresh = false }, thunkAPI) => {
    const cacheKey = CACHE_KEYS[entityType];
    const userId = isProfile ? getUserIdFromToken() : null;

    // if (!forceRefresh && !isProfile) {
    //   const cachedData = getCachedData(cacheKey);
    //   if (cachedData) {
    //     return { entityType, data: cachedData, isProfile };
    //   }
    // }

    try {
      const url = isProfile
        ? `${BASE_URL}/${entityType}?user_id=${userId}`
        : `${BASE_URL}/${entityType}`;

      const response = await axios.get(url);
      const data = Object.values(response.data).filter(
        (item) => typeof item === "object" && item.id
      );
      if (!isProfile) cacheData(cacheKey, data);
      return { entityType, data, isProfile };
    } catch (error) {
      const message =
        error.response?.message || `Ошибка при загрузке ${entityType}`;
      thunkAPI.dispatch(showNotification({ message, type: "error" }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const saveProfileData = createAsyncThunk(
  "data/saveProfileData",
  async ({ entityType, data, isEdit = false }, thunkAPI) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      thunkAPI.dispatch(
        showNotification({
          message: "Сессия истекла. Пожалуйста, войдите заново.",
          type: "error",
        })
      );
      return thunkAPI.rejectWithValue("No token available");
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("token", token);

    const url = isEdit
      ? `${BASE_URL}/update?table=${entityType}`
      : `${BASE_URL}/create?table=${entityType}`;

    try {
      const response = await axios.post(url, formData);
      const saveData = response.data;

      return { entityType, saveData };
    } catch (error) {
      const status = error.response?.status;
      let message;

      if (status === 403) {
        message = "У вас нет прав на выполнение этого действия.";
      } else if (status === 404) {
        message = "Данные не найдены.";
      } else {
        message = `Ошибка при ${
          isEdit ? "обновлении" : "создании"
        } ${entityType}`;
      }

      thunkAPI.dispatch(showNotification({ message, type: "error" }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProfileData = createAsyncThunk(
  "data/deleteProfileData",
  async ({ entityType, id }, thunkAPI) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      thunkAPI.dispatch(
        showNotification({
          message: "Сессия истекла. Пожалуйста, войдите заново.",
          type: "error",
        })
      );
      return thunkAPI.rejectWithValue("No token available");
    }

    const formData = new FormData();
    formData.append("token", token);

    try {
      await axios.post(
        `${BASE_URL}/trash?table=${entityType}&post_id=${id}`,
        formData
      );
      thunkAPI.dispatch(
        showNotification({ message: "Мероприятия удалена", type: "success" })
      );
      return { entityType, id };
    } catch (error) {
      const message = `Ошибка при удалении ${entityType}`;
      thunkAPI.dispatch(showNotification({ message, type: "error" }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    public: {
      news: {
        data: [],
        currentData: null,
        status: {
          fetch: "idle",
          save: "idle",
          delete: "idle",
        },
        error: null,
      },
      events: {
        data: [],
        currentData: null,
        status: {
          fetch: "idle",
          save: "idle",
          delete: "idle",
        },
        error: null,
      },
    },
    profile: {
      news: {
        data: [],
        currentData: null,
        status: {
          fetch: "idle",
          save: "idle",
          delete: "idle",
        },
        error: null,
      },
      events: {
        data: [],
        currentData: null,
        status: {
          fetch: "idle",
          save: "idle",
          delete: "idle",
        },
        error: null,
      },
    },
  },
  reducers: {
    setCurrentData: (state, action) => {
      const { entityType, id, isProfile } = action.payload;

      console.log("isProfile in reducer:", isProfile); // Логируем isProfile в reducer

      const dataKey = isProfile ? "profile" : "public";
      const foundData = state[dataKey][entityType]?.data.find(
        (item) => Number(item.id) === Number(id)
      );
      state[dataKey][entityType].currentData = foundData;
    },

    removeDataFromState: (state, action) => {
      const { entityType, id, isProfile } = action.payload;
      const dataKey = isProfile ? "profile" : "public";
      state[dataKey][entityType] = state[dataKey][entityType].filter(
        (item) => item.id !== id
      );
      cacheData(CACHE_KEYS[entityType], state.public[entityType].data); // Обновляем кэш после удаления
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {
        const { entityType, isProfile } = action.meta.arg;
        const dataKey = isProfile ? "profile" : "public";
        state[dataKey][entityType].status.fetch = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { entityType, data, isProfile } = action.payload;
        const dataKey = isProfile ? "profile" : "public";
        state[dataKey][entityType].status.fetch = "succeeded";
        state[dataKey][entityType].data = data;
      })
      .addCase(fetchData.rejected, (state, action) => {
        const { entityType, isProfile } = action.meta.arg;
        const dataKey = isProfile ? "profile" : "public";
        state[dataKey][entityType].status.fetch = "failed";
        state[dataKey][entityType].error = action.error.message;
      })

      .addCase(saveProfileData.pending, (state, action) => {
        const { entityType } = action.meta.arg;
        state.profile[entityType].status.save = "loading";
      })
      .addCase(saveProfileData.fulfilled, (state, action) => {
        const { entityType, savedData } = action.payload;
        state.profile[entityType].status.save = "succeeded";

        // Обновляем данные в профиле
        const profileIndex = state.profile[entityType].data.findIndex(
          (item) => item.id === savedData.id
        );
        if (profileIndex !== -1) {
          state.profile[entityType].data[profileIndex] = savedData;
        } else {
          state.profile[entityType].data.push(savedData);
        }

        if (savedData.status !== 0) {
          const publicIndex = state.public[entityType].data.findIndex(
            (item) => item.id === savedData.id
          );
          if (publicIndex !== -1) {
            state.public[entityType].data[publicIndex] = savedData;
          } else {
            state.public[entityType].data.push(savedData);
          }
        } else {
          state.public[entityType].data = state.public[entityType].data.filter(
            (item) => item.id !== savedData.id
          );
        }

        cacheData(CACHE_KEYS[entityType], state.public[entityType].data);
      })
      .addCase(saveProfileData.rejected, (state, action) => {
        const { entityType } = action.meta.arg;
        state.profile[entityType].status.save = "failed";
        state.profile[entityType].error = action.error.message;
      })

      // Обработка удаления данных
      .addCase(deleteProfileData.pending, (state, action) => {
        const { entityType } = action.meta.arg;
        state.profile[entityType].status.delete = "loading";
      })
      .addCase(deleteProfileData.fulfilled, (state, action) => {
        const { entityType, id } = action.payload;
        state.profile[entityType].status.delete = "succeeded";

        // Удаляем данные из профиля
        state.profile[entityType].data = state.profile[entityType].data.filter(
          (item) => item.id !== id
        );

        // Удаляем данные из публичной части
        state.public[entityType].data = state.public[entityType].data.filter(
          (item) => item.id !== id
        );

        cacheData(CACHE_KEYS[entityType], state.public[entityType].data);
      })
      .addCase(deleteProfileData.rejected, (state, action) => {
        const { entityType } = action.meta.arg;
        state.profile[entityType].status.delete = "failed";
        state.profile[entityType].error = action.error.message;
      });
  },
});

export const { setCurrentData, removeDataFromState } = dataSlice.actions;
export default dataSlice.reducer;

// Селекторы
export const selectCurrentData = (state, entityType, isProfile) => {
  const dataKey = isProfile ? "profile" : "public";
  return state.data[dataKey][entityType].currentData;
};

export const selectPublicData = (state, entityType) =>
  state.data.public[entityType];
export const selectProfileData = (state, entityType) =>
  state.data.profile[entityType];
export const selectFetchStatus = (state, entityType) =>
  state.data[entityType].status.fetch;
export const selectSaveStatus = (state, entityType) =>
  state.data[entityType].status.save;
export const selectDeleteStatus = (state, entityType) =>
  state.data[entityType].status.delete;
export const selectError = (state, entityType) => state.data[entityType].error;

// Селектор для сортировки новостей по дате
export const selectSortedPublicData = (state, entityType) => {
  return [...state.data.public[entityType].data].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
};
