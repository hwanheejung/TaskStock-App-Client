import { configureStore } from "@reduxjs/toolkit";
import valueReducer, { valueApi } from "./modules/value";
import { themeReducer } from "./modules/theme";

const store = configureStore({
  reducer: {
    [valueApi.reducerPath]: valueApi.reducer,
    value: valueReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(valueApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
