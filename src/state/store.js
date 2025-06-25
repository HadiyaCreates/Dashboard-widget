import { configureStore } from '@reduxjs/toolkit';
import widgetReducer from '../features/widgetSlice';

export const store = configureStore({
  reducer: {
    widgets: widgetReducer,
  },
});
