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
  Typography,
  Divider,
  CardMedia,
  Button,
  Card,
  CardActionArea,
} from "@material-ui/core";
import { Offer as OfferType } from "pages/offers";
import { FullWidthTabs } from "components/Tabs";
import { GetServerSideProps } from "next";
import { terms } from "mocks/terms";
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
  const { state, dispatch } = useAuth();

  const adjustSpaceLeftText = (spacesLeft: number): string => {
    if (spacesLeft === 0) {
      return "No spaces left";
    } else if (spacesLeft === 1) {
      return `${spacesLeft} space left`;
    } else {
      return `${spacesLeft} spaces left`;
    }
  };

  const handleClick = () => {
    if (state.authenticated === "AUTHENTICATED") {
      //open modal
      console.log("moge kliknac i bedzia dzialac");
    } else {
      // register / login
    }
  };
  console.log(sport);

  return (
    <Paper className={classes.paper}>
      <Grid component="section" container direction="row">
        <Grid item xs={6} className={`${classes.paddings} ${classes.info}`}>
          <CardMedia
            className={classes.media}
            image={`/${sport.toLowerCase()}.jpg`}
            title="Contemplative Reptile"
          />
          {/* <img
            style={{ maxHeight: 350, borderRadius: 15 }}
            src="gym.jpg"
            alt="Data coming from all directions to a computer"
          /> */}
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
                ? `First entery is for free!`
                : `There are no discounts`}
            </div>
            <div>Currently there are no special offers</div>
          </FullWidthTabs>
        </Grid>
        <Grid item xs={6} className={`${classes.paddings} ${classes.info}`}>
          <Typography variant="h5">Schedule</Typography>
          <Divider />
          <Box mt={3}>
            {terms.map((term) => (
              <>
                <Box textAlign="center" className={classes.dateBox} py={2}>
                  <Typography variant="subtitle2">
                    {term.day.toDateString()}
                  </Typography>
                </Box>
                <Box my={2}>
                  {term.classes.map((classi) => (
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
                        <Typography variant="body2">{classi.time}</Typography>
                        <Typography variant="subtitle2">
                          {classi.duration} min
                        </Typography>
                      </Box>
                      <Typography
                        variant="subtitle1"
                        style={{ paddingLeft: 45 }}
                      >
                        {adjustSpaceLeftText(classi.spacesLeft)}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={!classi.spacesLeft}
                        onClick={handleClick}
                      >
                        Join
                      </Button>
                    </Box>
                  ))}
                </Box>
              </>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context);
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
