import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://it-park.kz/ru/api";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await axios.get(`${BASE_URL}/projects`);
    return response.data;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    currentProject: null,
    status: "idle",
    error: null,
  },

  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProject = state.projects.find(
        (project) => project.id === action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
        state.currentProject = action.payload.find(
          (project) => project.id === parseInt(action.meta.arg)
        );
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentProject } = projectsSlice.actions;

export default projectsSlice.reducer;

export const selectProjects = (state) => state.projects.projects;
export const selectProjectsStatus = (state) => state.projects.status;
export const selectProjectsError = (state) => state.projects.error;
export const selectCurrentProject = (state) => state.projects.currentProject;
