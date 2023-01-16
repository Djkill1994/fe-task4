import { Button, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { loginSelector } from "../../../features/Auth/slice/login.slice";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

export const Header: FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(loginSelector);

  const logOut = (): void => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <Stack
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      height="50px"
      bgcolor="white"
      borderBottom="1px solid #dbdbdb"
      p="0 10px"
    >
      <Typography>Hello: {currentUser?.name}</Typography>
      <Stack>
        <Button onClick={logOut}>
          <LogoutIcon />
        </Button>
      </Stack>
    </Stack>
  );
};
