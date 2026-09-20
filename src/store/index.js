import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import consultationsReducer from './consultationsSlice';
import uiReducer from './uiSlice';
import websiteContentReducer from './websiteContentSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    consultations: consultationsReducer,
    ui: uiReducer,
    websiteContent: websiteContentReducer,
  },
});

export default store;

