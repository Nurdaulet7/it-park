// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./slices/eventsSlice";
import residentsReducer from "./slices/residentsSlice";
import partnersReducer from "./slices/partnersSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    residents: residentsReducer,
    partners: partnersReducer,
  },
});
