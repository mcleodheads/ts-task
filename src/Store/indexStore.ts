import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import tableReducer from './reducers/tableReducer';

const store = configureStore({
  reducer: {
    userReducer,
    tableReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
