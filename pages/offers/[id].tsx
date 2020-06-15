import React from "react";
import { grey } from "@material-ui/core/colors";
import { useRouter } from "next/router";
import {
  Paper,
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Box,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import { offers, Offer as OfferType } from "mocks/offers";
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
  })
);

interface OfferProps {
  offer: OfferType;
}

const Offer: React.FC<OfferProps> = ({ offer }) => {
  // const router = useRouter();
  const classes = useStyles();
  const { state, dispatch } = useAuth();
  // const { id } = router.query;

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

  return (
    <Paper className={classes.paper}>
      <Grid component="section" container direction="row">
        <Grid item xs={6} className={`${classes.paddings} ${classes.info}`}>
          <img
            style={{ maxHeight: 350, borderRadius: 15 }}
            src="/gym.jpg"
            alt="Data coming from all directions to a computer"
          />
          <Box my={2}>
            <Typography variant="caption" color="textSecondary">
              {`sport type`.toUpperCase()}
            </Typography>
            <Typography variant="h5">{offer.name}</Typography>
          </Box>
          <FullWidthTabs labels={["Info", "Location", "Reviews"]}>
            <div>info</div>
            <div>location</div>
            <div>reviews</div>
          </FullWidthTabs>
          <FullWidthTabs labels={["Pricing", "Discounts", "Special offers"]}>
            <div>pricing</div>
            <div>discounts</div>
            <div>sepcial offers</div>
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
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let response = await new Promise((res, rej) => {
    setTimeout(() => {
      res(offers[0]);
    }, 1000);
  });

  return {
    props: {
      offer: response,
    },
  };
};
export default Offer;
