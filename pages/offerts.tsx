import { NextPage, GetServerSideProps } from "next";
import { Fragment, useRef } from "react";
import { offers, Offer } from "mocks/offers";
import { Map } from "components/Map";
import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { OffersList } from "components/OffersList";

interface OffertsProps {
  response: Offer[];
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      marginTop: theme.spacing(8),
    },
    bottom: {
      marginBottom: theme.spacing(2),
    },
  })
);
const Offerts: NextPage<OffertsProps> = ({ response }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  return (
    <Fragment>
      <Grid
        component="section"
        className={classes.section}
        container
        direction="row"
        justify="center"
      >
        <Grid item xs={5} style={{ paddingRight: 20 }}>
          <OffersList offers={response} />
        </Grid>
        <Grid item xs={7}>
          <Map offers={response} mapRef={mapRef} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let response = await new Promise((res, rej) => {
    setTimeout(() => {
      res(offers);
    }, 1000);
  });

  return {
    props: {
      response,
    },
  };
};
export default Offerts;
