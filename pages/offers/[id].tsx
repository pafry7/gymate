import React, { useEffect } from "react";
import wretch from "wretch";
import { grey } from "@material-ui/core/colors";
import { useRouter } from "next/router";
import {
  Paper,
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Typography,
  Divider,
  CardMedia,
  Button,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { Offer as OfferType } from "pages/offers";
import { FullWidthTabs } from "components/Tabs";
import { GetServerSideProps } from "next";
import { useAuth } from "context/AuthContext";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(6),
      height: "85%",
    },
    paddings: {
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    info: {
      display: "flex",
      flexDirection: "column",
    },
    dateBox: {
      backgroundColor: grey[200],
    },
    button: {
      width: "100px",
      borderRadius: "30px",
    },
    media: {
      height: 400,
    },
  })
);

interface OfferProps {
  offer: OfferType;
  sport: string;
  address: string;
}

const Offer: React.FC<OfferProps> = ({ offer, sport, address }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { state, dispatch } = useAuth();
  const [userRes, setUserRes] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    async function fetchSport() {
      try {
        const response = await wretch()
          .url(
            `https://gymate-restapi.herokuapp.com/users/${state.user.id}/reservations`
          )
          .get()
          .json();
        setUserRes(response);
        setLoading(false);
      } catch (err) {}
    }
    fetchSport();
  }, [state.user]);

  const checkIfReserved = (date: Date) => {
    let flag = false;
    userRes?.forEach((ev) => {
      if (ev.offerId === offer.id) {
        if (new Date(date).getTime() === +new Date(ev.eventDate).getTime()) {
          flag = true;
        }
      }
    });
    return flag;
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const adjustSpaceLeftText = (spacesLeft: number): string => {
    if (spacesLeft === 0) {
      return "No spaces left";
    } else if (spacesLeft === 1) {
      return `${spacesLeft} space left`;
    } else {
      return `${spacesLeft} spaces left`;
    }
  };

  const handleClick = async (date: any) => {
    if (state.authenticated === "AUTHENTICATED") {
      try {
        await wretch()
          .url(
            `https://gymate-restapi.herokuapp.com/offers/${offer.id}/reservations`
          )
          .post({
            offerId: offer.id,
            userId: state.user.id,
            eventDate: date,
          })
          .json();
        handleOpenSnackbar();
        router.push("/schedule");
      } catch (err) {
        console.error(err);
      }
    } else {
      handleClickOpen();
    }
  };

  const formattedDates = offer.dates.map((date) => {
    const fDate = new Date(date).toDateString();
    const time = new Date(date).toLocaleTimeString();
    return { fDate, time, oDate: date };
  });

  return (
    <Paper className={classes.paper}>
      <Grid component="section" container direction="row">
        <Grid item xs={6} className={`${classes.paddings} ${classes.info}`}>
          <CardMedia
            className={classes.media}
            image={`/${sport.toLowerCase()}.jpg`}
            title="Contemplative Reptile"
          />
          <Box my={2}>
            <Typography variant="caption" color="textSecondary">
              {sport.toUpperCase()}
            </Typography>
            <Typography variant="h5">{offer.name}</Typography>
          </Box>
          <FullWidthTabs labels={["Info", "Location", "Reviews"]}>
            <div>{offer.description}</div>
            <div>{address}</div>
            <div>There are no reviews yet</div>
          </FullWidthTabs>
          <FullWidthTabs labels={["Pricing", "Discounts", "Special offers"]}>
            <div>{`Entry costs ${offer.singlePrice} zł`}</div>
            <div>
              {offer.isFirstFree
                ? `First entry is for free!`
                : `There are no discounts`}
            </div>
            <div>Currently there are no special offers</div>
          </FullWidthTabs>
        </Grid>
        <Grid item xs={6} className={`${classes.paddings} ${classes.info}`}>
          <Typography variant="h5">Schedule</Typography>
          <Divider />
          <Box mt={3}>
            {formattedDates.map((date) => (
              <>
                <Box textAlign="center" className={classes.dateBox} py={2}>
                  <Typography variant="subtitle2">{date.fDate}</Typography>
                </Box>
                <Box my={2}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    px={2}
                    alignItems="center"
                    my={1}
                    py={1}
                  >
                    <Box
                      display="flex"
                      pl={2}
                      flexDirection="column"
                      justifyContent="space-between"
                      height="45px"
                      textAlign="center"
                      alignContent="center"
                    >
                      <Typography variant="body2">{date.time}</Typography>
                      <Typography variant="subtitle2">60 min</Typography>
                    </Box>
                    <Typography variant="subtitle1" style={{ paddingLeft: 45 }}>
                      {adjustSpaceLeftText(offer.spots)}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      disabled={!offer.spots || checkIfReserved(date.oDate)}
                      onClick={() => handleClick(date.oDate)}
                    >
                      {!loading ? (
                        checkIfReserved(date.oDate) ? (
                          "Enrolled"
                        ) : (
                          "Join"
                        )
                      ) : (
                        <CircularProgress />
                      )}
                    </Button>
                  </Box>
                </Box>
              </>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Alert</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You must be logged in to join.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </Paper>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.query;
  const response: OfferType = await wretch()
    .url(`https://gymate-restapi.herokuapp.com/offers/${id}`)
    .get()
    .json();
  const sport = await wretch()
    .url(`https://gymate-restapi.herokuapp.com/sports/${response.sportId}`)
    .get()
    .json();
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoicGFmcnkiLCJhIjoiY2tiZjN5YXprMHMydjJ4bTJ6Nmc0Nm05cCJ9.tjK7bVJ2b60K7UAnLSc3dg";

  const address = await wretch()
    .url(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${response.longitude},${response.latitude}.json?access_token=${MAPBOX_TOKEN}`
    )
    .get()
    .json();
  return {
    props: {
      offer: response,
      sport: sport.name,
      address: address.features[0].place_name,
    },
  };
};
export default Offer;
