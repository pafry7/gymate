import { NextPage, GetServerSideProps } from "next";
import { Fragment, useRef } from "react";
import { Map } from "components/Map";
import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import wretch from "wretch";
import { OffersList } from "components/OffersList";

export interface Offer {
  id: string;
  name: string;
  description: string;
  singlePrice: number;
  isFirstFree: boolean;
  dates: Date[];
  provideId: number;
  latitude: number;
  longitude: number;
  sportId: number;
  sports: number;
}
interface OffersProps {
  offers: Offer[];
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
const Offers: NextPage<OffersProps> = ({ offers }) => {
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
          <OffersList offers={offers} />
        </Grid>
        <Grid item xs={7}>
          {/* <Map offers={offers} mapRef={mapRef} /> */}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { discipline }: any = query;
  console.log(discipline);
  const response = await wretch()
    .url(`https://gymate-restapi.herokuapp.com/offers/sports/${discipline}`)
    .get()
    .json();
  console.log(response);
  return {
    props: {
      offers: response,
    },
  };
};
export default Offers;
