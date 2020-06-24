import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { useAuth } from "context/AuthContext";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Types, UserResponse } from "reducers/authReducer";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import wretch from "wretch";
interface RegisterDialogProps {
  open: boolean;
  handleClose: () => void;
}

type Inputs = {
  name: string;
  password: string;
  email: string;
  confirmPassword: string;
};

const RegisterSchema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().required().email(),
  confirmPassword: yup.string().required(),
});

const RegisterDialog = ({ open, handleClose }: RegisterDialogProps) => {
  const { state, dispatch } = useAuth();
  const { register, handleSubmit, errors, reset } = useForm<Inputs>({
    validationSchema: RegisterSchema,
  });

  const onSubmit = async (data) => {
    const response: UserResponse = await wretch()
      .url("https://gymate-restapi.herokuapp.com/users")
      .post({
        password: data.password,
        username: data.name,
        accountType: 2,
        email: data.email,
      })
      .json();
    console.log(response);
    dispatch({
      type: Types.LOGIN,
      payload: {
        email: response.email,
        id: response.id,
        username: response.username,
        accountType: response.accountType,
      },
    });
    localStorage.setItem("user", response.jwt);
    reset();
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-register-title"
    >
      <DialogTitle id="form-dialog-register-title">Signup</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            name="name"
            fullWidth
            label="Username"
            error={!!errors.name}
            id="name"
            type="text"
            inputRef={register}
          />
          <TextField
            name="email"
            fullWidth
            label="Email"
            error={!!errors.email}
            id="email"
            type="text"
            inputRef={register}
          />
          <TextField
            name="password"
            type="password"
            id="password"
            error={!!errors.password}
            fullWidth
            label="Password"
            inputRef={register}
          />
          <TextField
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            error={!!errors.confirmPassword}
            fullWidth
            label="Confirm Password"
            inputRef={register}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={
              !!errors.name ||
              !!errors.password ||
              !!errors.email ||
              !!errors.confirmPassword
            }
          >
            Signup
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export { RegisterDialog };
