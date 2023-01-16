import { Box } from "@mui/material";
import { FC } from "react";
import { Header } from "../../../../common/components/Header";

export const UserListPage: FC = () => (
  <Box bgcolor="#FAFAFA">
    <Header />
    <Box m="50px auto" maxWidth="700px">
      User Table
    </Box>
  </Box>
);
