// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./slices/eventsSlice";
import residentsReducer from "./slices/residentsSlice";
import partnersReducer from "./slices/partnersSlice";
import publicEventsReducer from "./slices/publicEventsSlice";
import publicNewsReducer from "./slices/publicNewsSlice";
import profileNewsReducer from "./slices/profileNewsSlice";
import vacanciesReducer from "./slices/vacanciesSlice";
import projectsReducer from "./slices/projectsSlice";
import notificationReducer from "./slices/notificationSlice";
import authenticationReducer from "./slices/authSlice";
export const store = configureStore({
  reducer: {
    residents: residentsReducer,
    events: eventsReducer,
    publicEvents: publicEventsReducer,
    publicNews: publicNewsReducer,
    profileNews: profileNewsReducer,
    vacancies: vacanciesReducer,
    projects: projectsReducer,
    partners: partnersReducer,
    notification: notificationReducer,
    auth: authenticationReducer,
  },
});
