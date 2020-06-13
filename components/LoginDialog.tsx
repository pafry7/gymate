import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "context/AuthContext";
import { Types } from "reducers/authReducer";

interface LoginDialogProps {
  open: boolean;
  handleClose: () => void;
}

type Inputs = {
  name: string;
  password: string;
};

const LoginSchema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required(),
});

const LoginDialog = ({ open, handleClose }: LoginDialogProps) => {
  const { state, dispatch } = useAuth();
  console.log(state);
  const { register, handleSubmit, errors, reset } = useForm<Inputs>({
    validationSchema: LoginSchema,
  });

  const onSubmit = (data: Inputs) => {
    dispatch({
      type: Types.LOGIN,
      payload: { password: data.password, username: data.name },
    });
    reset();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-login-title"
    >
      <DialogTitle id="form-dialog-title-title">Login</DialogTitle>
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
            name="password"
            type="password"
            id="password"
            error={!!errors.password}
            fullWidth
            label="Password"
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
            disabled={!!errors.name || !!errors.password}
          >
            Login
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export { LoginDialog };
