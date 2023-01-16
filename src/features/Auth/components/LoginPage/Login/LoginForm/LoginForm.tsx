import { FC, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../../../api/login.api";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX } from "../../../../../../common/constans/regex";
import toast from "react-hot-toast";

interface ILoginForm {
  identity: string;
  password: string;
}

export const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [login, { data }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    login(data);
  };

  useEffect(() => {
    if (data?.record.banned) {
      toast.error("You are banned");
      return;
    }
    if (data?.token) {
      localStorage.setItem("token", data.token ?? "");
      navigate("/content", { replace: true });
    }
  }, [data?.token, data?.record.banned]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={1.8}>
        <Grid item sm={12} width="100%">
          <TextField
            {...register("identity", { required: true, pattern: EMAIL_REGEX })}
            error={!!errors.identity}
            helperText={!!errors.identity && "Enter email"}
            size="small"
            autoComplete="email"
            fullWidth
            label="Email"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel
              htmlFor="outlined-adornment-password"
              error={!!errors.password}
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true, minLength: 10 })}
              error={!!errors.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {!!errors.password && (
              <FormHelperText id="outlined-adornment-password" error>
                Enter password
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            loadingPosition="center"
            variant="contained"
            fullWidth
            type="submit"
          >
            Log in
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};
