import React, { useState } from "react";
import { useAuth } from "context/AuthContext";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Button from "@material-ui/core/Button";
import { Types } from "reducers/authReducer";
import { LoginDialog } from "components/LoginDialog";
import Link from "next/link";
import { RegisterDialog } from "components/RegisterDialog";
import { Box, IconButton, Badge, Menu, MenuItem } from "@material-ui/core";

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { state, dispatch } = useAuth();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (name: BUTTON_EVENT) => {
    if (name === "LOGIN") {
      setOpenLoginDialog(true);
    }
    if (name === "SIGNUP") {
      setOpenRegisterDialog(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: Types.LOGOUT, payload: {} });
    handleMenuClose();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link href="/schedule">
          <p>Schedule</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Gymate
          </Typography>
          {state.authenticated === "UNAUTHENTICATED" ? (
            <Box>
              <Button color="inherit" onClick={() => handleClick("LOGIN")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => handleClick("SIGNUP")}>
                Sign up
              </Button>
            </Box>
          ) : (
            <Box>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Box>
          )}
        </Toolbar>
        {renderMenu}
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
