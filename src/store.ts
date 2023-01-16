import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "./features/Auth/api/login.api";
import { usersApi } from "./features/Users/api/users.api";
import { rtkQueryErrorMessenger } from "./common/middleware/rtkQueryErrorMessenger";
import { loginSlice } from "./features/Auth/slice/login.slice";
import { registrationApi } from "./features/Auth/api/registration.api";

export const store = configureStore({
  reducer: {
    loginUser: loginSlice.reducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      rtkQueryErrorMessenger,
      registrationApi.middleware,
      loginApi.middleware,
      usersApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
