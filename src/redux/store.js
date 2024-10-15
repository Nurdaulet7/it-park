// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import residentsReducer from "./slices/residentsSlice";
import partnersReducer from "./slices/partnersSlice";
import publicEventsReducer from "./slices/publicEventsSlice";
import profileEventsReducer from "./slices/profileEventSlice";
import publicNewsReducer from "./slices/publicNewsSlice";
import profileNewsReducer from "./slices/profileNewsSlice";
import vacanciesReducer from "./slices/vacanciesSlice";
import projectsReducer from "./slices/projectsSlice";
import notificationReducer from "./slices/notificationSlice";
import authenticationReducer from "./slices/authSlice";
import dataReducer from "./slices/dataSlice";
export const store = configureStore({
  reducer: {
    data: dataReducer,
    residents: residentsReducer,
    // publicEvents: publicEventsReducer,
    // profileEvents: profileEventsReducer,
    // publicNews: publicNewsReducer,
    // profileNews: profileNewsReducer,
    vacancies: vacanciesReducer,
    projects: projectsReducer,
    partners: partnersReducer,
    notification: notificationReducer,
    auth: authenticationReducer,
  },
});
