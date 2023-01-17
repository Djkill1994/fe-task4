import { Toolbar, Typography, Tooltip, alpha, IconButton } from "@mui/material";
import { Delete, Block, CheckCircleOutline } from "@mui/icons-material";
import { FC } from "react";

interface IUsersTableToolbarProps {
  numSelected: number;
}

export const UsersTableToolbar: FC<IUsersTableToolbarProps> = ({
  numSelected,
}) => (
  <Toolbar
    sx={{
      pl: { sm: 2 },
      pr: { xs: 1, sm: 1 },
      ...(numSelected > 0 && {
        background: (theme) =>
          alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity
          ),
      }),
    }}
  >
    {numSelected > 0 ? (
      <Typography
        sx={{ flex: "1 1 100%" }}
        color="inherit"
        variant="subtitle1"
        component="div"
      >
        {numSelected} selected
      </Typography>
    ) : (
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Users
      </Typography>
    )}
    <Tooltip title="Delete">
      <IconButton>
        <Delete />
      </IconButton>
    </Tooltip>
    <Tooltip title="Ban">
      <IconButton>
        <Block />
      </IconButton>
    </Tooltip>
    <Tooltip title="Unban">
      <IconButton>
        <CheckCircleOutline />
      </IconButton>
    </Tooltip>
  </Toolbar>
);
