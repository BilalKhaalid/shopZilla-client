import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/UserApi";
import { userReducer } from "./reducer/UserReducer";
import { productApi } from "./api/ProductApi";
import { cartReducer } from "./reducer/CartReducer";
import { orderApi } from "./api/OrderApi";
import { dashboardApi } from "./api/DashboardApi";

const server = import.meta.env.VITE_SERVER;

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartReducer.name]: cartReducer.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      dashboardApi.middleware
    ),
});

export { store, server };

export type RootState = ReturnType<typeof store.getState>;
