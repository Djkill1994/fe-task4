import { Route, Routes } from "react-router-dom";
import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { LoginPage } from "./features/Auth/components/LoginPage";
import { RequireAuth } from "./common/components/RequireAuth";
import { UserListPage } from "./features/Users/components/UserListPage";
import { Box } from "@mui/material";
import { RegistrationPage } from "./features/Auth/components/RegistrationPage";

export const ROUTE_PATHS = {
  Login: "/",
  SignUp: "sign-up",
  UserList: "user-list",
};

export const App: FC = () => (
  <Box height="100vh" bgcolor="#FAFAFA">
    <Toaster position="top-right" />
    <Routes>
      <Route path={ROUTE_PATHS.Login} element={<LoginPage />} />
      <Route path={ROUTE_PATHS.SignUp} element={<RegistrationPage />} />
      <Route
        path={ROUTE_PATHS.UserList}
        element={
          <RequireAuth>
            <UserListPage />
          </RequireAuth>
        }
      />
    </Routes>
  </Box>
);
