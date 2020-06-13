import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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
  const { register, handleSubmit, errors } = useForm<Inputs>({
    validationSchema: RegisterSchema,
  });

  const onSubmit = (data) => {
    console.log(data);
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
