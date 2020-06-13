import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { LoginDialog } from "components/LoginDialog";
import { RegisterDialog } from "components/RegisterDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      marginLeft: theme.spacing(2),
    },
  })
);

type BUTTON_EVENT = "LOGIN" | "SIGNUP";

export function Header() {
  const classes = useStyles();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

  const handleClick = (name: BUTTON_EVENT) => {
    if (name === "LOGIN") {
      setOpenLoginDialog(true);
    }
    if (name === "SIGNUP") {
      setOpenRegisterDialog(true);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Gymate
          </Typography>
          <Button color="inherit" onClick={() => handleClick("LOGIN")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => handleClick("SIGNUP")}>
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
      <LoginDialog
        open={openLoginDialog}
        handleClose={() => setOpenLoginDialog(false)}
      />
      <RegisterDialog
        open={openRegisterDialog}
        handleClose={() => setOpenRegisterDialog(false)}
      />
    </div>
  );
}
