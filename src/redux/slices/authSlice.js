import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showNotification } from "./notificationSlice";

// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async (registrationData, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await axios.post('https://it-park.kz/kk/api/register', registrationData);

//       if (response.data.success) {
//         dispatch(showNotification({ message: 'Регистрация успешна!', type: 'success' }));
//         return response.data;
//       } else {
//         return rejectWithValue('Ошибка при регистрации. Попробуйте снова.');
//       }
//     } catch (error) {
//       dispatch(showNotification({
//         message: error.response?.data?.message || 'Ошибка сети. Попробуйте позже.',
//         type: 'error',
//       }));
//       return rejectWithValue(error.response?.data?.message || 'Ошибка сети. Попробуйте позже.');
//     }
//   }
// );

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("login", loginData.login);
      formData.append("password", loginData.password);

      const response = await axios.post(
        "https://it-park.kz/kk/api/login",
        formData
      );

      if (response.data.token) {
        const token = response.data.token;
        const tokenParts = token.split(".");
        const payloadBase64 = tokenParts[1];
        const payloadDecoded = atob(payloadBase64);
        const payloadObject = JSON.parse(payloadDecoded);
        const user = payloadObject.user || null;
        const expiresIn = 5 * 60 * 60 * 1000;
        const expirationTime = new Date().getTime() + expiresIn;

        localStorage.setItem("jwtToken", token);
        localStorage.setItem("tokenExpiration", expirationTime);

        dispatch(
          showNotification({ message: "Вход выполнен", type: "success" })
        );
        return { token, user };
      } else {
        return rejectWithValue(
          "Ошибка аутентификации. Проверьте введенные данные."
        );
      }
    } catch (error) {
      dispatch(
        showNotification({
          message: error.response?.data?.message || "Неверные логин или пароль",
          type: "error",
        })
      );
      return rejectWithValue(
        error.response?.data?.message || "Ошибка сети. Попробуйте позже."
      );
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("jwtToken") || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
      state.status = "idle";
    },
    clearError: (state) => {
      state.error = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user || null;
        localStorage.setItem("jwtToken", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Ошибка при входе в систему.";
      });
  },
});

export const { logout, clearError, setToken } = authSlice.actions;
export default authSlice.reducer;

export const selectAuthToken = (state) => state.auth.token;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthStatus = (state) => state.auth.status;
