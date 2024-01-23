import { configureStore } from "@reduxjs/toolkit";
import chartReducer, { chartApi } from "./modules/chart";
import { themeReducer } from "./modules/theme";
import calendarReducer from "./modules/calendar";
import todoReducer, { todoApi } from "./modules/todo/todo";
import { authReducer } from "./modules/auth";
import projectReducer, { projectApi } from "./modules/project/project";
import homeReducer from "./modules/home";
import userReducer from "./modules/user";
const store = configureStore({
  reducer: {
    [chartApi.reducerPath]: chartApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    user: userReducer,
    auth: authReducer,
    chart: chartReducer,
    home: homeReducer,
    theme: themeReducer,
    calendar: calendarReducer,
    todo: todoReducer,
    project: projectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(chartApi.middleware)
      .concat(todoApi.middleware)
      .concat(projectApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
