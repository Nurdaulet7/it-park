// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./slices/eventsSlice";
import residentsReducer from "./slices/residentsSlice";
import partnersReducer from "./slices/partnersSlice";
import publicNewsReducer from "./slices/publicNewsSlice";
import profileNewsReducer from "./slices/profileNewsSlice";
import vacanciesReducer from "./slices/vacanciesSlice";
import projectsReducer from "./slices/projectsSlice";
import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    residents: residentsReducer,
    partners: partnersReducer,
    publicNews: publicNewsReducer,
    profileNews: profileNewsReducer,
    vacancies: vacanciesReducer,
    projects: projectsReducer,
    notification: notificationReducer,
  },
});
