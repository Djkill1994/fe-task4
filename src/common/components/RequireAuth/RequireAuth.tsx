import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthRefreshMutation } from "../../../features/Users/api/users.api";
import { setCurrentUser } from "../../../features/Auth/slice/login.slice";
import { useDispatch } from "react-redux";
import { Box, CircularProgress } from "@mui/material";

interface IRequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth: FC<IRequireAuthProps> = ({ children }) => {
  const [authRefresh, { isError, isSuccess, data }] = useAuthRefreshMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setCurrentUser(data.record));
    }
  }, [data]);

  useEffect(() => {
    authRefresh();
  }, []);

  if (isError) {
    return <Navigate to="/" replace />;
  }

  if (isSuccess) {
    return children;
  }

  return (
    <Box justifyContent="space-evenly">
      <CircularProgress />
    </Box>
  );
};
