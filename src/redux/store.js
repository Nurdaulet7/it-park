// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import residentsReducer from "./slices/residentsSlice";
import partnersReducer from "./slices/partnersSlice";
import projectsReducer from "./slices/projectsSlice";
import notificationReducer from "./slices/notificationSlice";
import authenticationReducer from "./slices/authSlice";
import dataReducer from "./slices/dataSlice";
export const store = configureStore({
  reducer: {
    data: dataReducer,
    residents: residentsReducer,
    projects: projectsReducer,
    partners: partnersReducer,
    notification: notificationReducer,
    auth: authenticationReducer,
  },
});
