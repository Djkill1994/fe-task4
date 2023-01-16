import { Box, Button, Grid, TextField } from "@mui/material";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegistrationMutation } from "../../../api/registration.api";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX } from "../../../../../common/constans/regex";
import { FormInputPassword } from "./FormInputPassword";
import toast from "react-hot-toast";

export interface IRegistrationForm {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const RegistrationForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationForm>();
  const [registerUser, { isSuccess }] = useRegistrationMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IRegistrationForm> = (data) => {
    registerUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/", { replace: true });
      toast.success("Check your email to complete registration");
    }
  }, [isSuccess]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 3 }}
    >
      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Grid item xs={12} width="100%">
          <TextField
            {...register("email", { required: true, pattern: EMAIL_REGEX })}
            error={!!errors.email}
            helperText={!!errors.email && "Enter email"}
            size="small"
            autoComplete="email"
            label="Email"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <TextField
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={!!errors.name && "Enter your name"}
            size="small"
            label="Full Name"
            autoComplete="fullName"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <FormInputPassword
            id="password"
            error={errors.password && "Password is not valid"}
            label="Password"
            inputProps={register("password", {
              required: true,
              minLength: 10,
            })}
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <FormInputPassword
            id="confirmPassword"
            error={errors.passwordConfirm && "Confirm password is not valid"}
            label="Confirm Password"
            inputProps={register("passwordConfirm", {
              required: true,
              minLength: 10,
            })}
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <Button type="submit" variant="contained" sx={{ mt: 3 }} fullWidth>
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
