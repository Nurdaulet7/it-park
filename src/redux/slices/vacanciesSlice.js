import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://it-park.kz/ru/api";

export const fetchVacancies = createAsyncThunk(
  "vacancies/fetchVacancies",
  async () => {
    const response = await axios.get(`${BASE_URL}/vacancy`);
    return response.data;
  }
);

const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState: {
    vacancies: [],
    currentVacancy: null,
    status: "idle",
    error: null,
  },

  reducers: {
    setCurrentVacancy: (state, action) => {
      state.currentVacancy = state.vacancies.find(
        (vacancy) => vacancy.id === action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vacancies = action.payload;
        state.currentVacancy = action.payload.find(
          (vacancy) => vacancy.id === parseInt(action.meta.arg)
        );
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentVacancy } = vacanciesSlice.actions;

export default vacanciesSlice.reducer;

export const selectVacancies = (state) => state.vacancies.vacancies;
export const selectVacanciesStatus = (state) => state.vacancies.status;
export const selectVacanciesError = (state) => state.vacancies.error;
export const selectCurrentVacancies = (state) => state.vacancies.currentVacancy;
