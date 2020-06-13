import { NextPage } from "next";
import { Search } from "@material-ui/icons";
import { Fragment } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const Home: NextPage = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid
        component="section"
        className={classes.section}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6} className={classes.item}>
          <h1>Make your life better</h1>
          <p>
            Find sporting activities in your area and take care of your health.
            Choose your favorite discipline and join the classes or book a
            personal trainer.
          </p>
          <Button variant="contained" color="primary">
            Primary
          </Button>
        </Grid>
        <Grid item xs={6}>
          <img
            style={{ maxHeight: 350 }}
            src="/landing.svg"
            alt="Data coming from all directions to a computer"
          />
        </Grid>
      </Grid>
      <Paper
        elevation={1}
        className={`${classes.textFieldBox} ${classes.box}`}
        component="section"
      >
        <Box>
          <h1>Find activities in your area</h1>
          <form noValidate autoComplete="off">
            <Box className={classes.textFieldBox}>
              <TextField
                className={classes.textField}
                id="standard-basic"
                label="Discipline"
              />
              <TextField
                className={classes.textField}
                id="standard-basic"
                label="Address"
              />
              <IconButton aria-label="delete" edge="start" size="medium">
                <Search />
              </IconButton>
            </Box>
          </form>
        </Box>
      </Paper>

      <Box component="section" className={`${classes.section} ${classes.box}`}>
        <Box>
          <h1>Services</h1>
          <p>We are a reliable company</p>
        </Box>
        <Grid
          component="section"
          className={classes.section}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs>
            <Paper className={classes.paper}>
              <img
                style={{ maxHeight: 150, marginTop: "30px" }}
                src="/service1.svg"
                alt="Data coming from all directions to a computer"
              />
              <Typography
                variant="body2"
                style={{ marginTop: "30px", width: "60%" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <img
                style={{ maxHeight: 150, marginTop: "30px" }}
                src="/service2.svg"
                alt="Data coming from all directions to a computer"
              />
              <Typography
                variant="body2"
                style={{ marginTop: "30px", width: "60%" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <img
                style={{ maxHeight: 150, marginTop: "30px" }}
                src="/service3.svg"
                alt="Data coming from all directions to a computer"
              />
              <Typography
                variant="body2"
                style={{ marginTop: "30px", width: "60%" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Home;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
    },
    box: {
      textAlign: "center",
      paddingBottom: theme.spacing(8),
      paddingTop: theme.spacing(8),
    },
    item: {
      paddingTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "start",
    },
    textFieldBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    textField: {
      marginRight: theme.spacing(1),
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
      height: "400px",
      width: "350px",
    },
  })
);
