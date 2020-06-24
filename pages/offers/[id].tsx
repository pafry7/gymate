import React from "react";
import wretch from "wretch";
import { grey } from "@material-ui/core/colors";
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
} from "@material-ui/core";
import { Offer as OfferType } from "pages/offers";
import { FullWidthTabs } from "components/Tabs";
import { GetServerSideProps } from "next";
import { useAuth } from "context/AuthContext";

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

  const handleClick = async () => {
    if (state.authenticated === "AUTHENTICATED") {
      //  await wretch()
      //   .url(`https://gymate-restapi.herokuapp.com/offers/${id}`)
      //   .get()
      //   .json();
      //open modal
    } else {
      handleClickOpen();
    }
  };

  const formattedDates = offer.dates.map((date) => {
    const fDate = new Date(date).toDateString();
    const time = new Date(date).toLocaleTimeString();
    return { fDate, time };
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
                      disabled={!offer.spots}
                      onClick={handleClick}
                    >
                      Join
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
