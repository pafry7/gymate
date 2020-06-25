import React, { useEffect } from "react";
import { Offer } from "pages/offers";
import { makeStyles } from "@material-ui/core/styles";
import wretch from "wretch";
import {
  Card,
  CircularProgress,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@material-ui/core";
import Link from "next/link";

interface OfferPopupInfoProps {
  offer: Offer;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 445,
    width: 200,
    marginTop: 10,
  },
  media: {
    height: 150,
  },
});

const OfferPopupInfo: React.FC<OfferPopupInfoProps> = ({ offer }) => {
  const classes = useStyles();
  const [sport, setSport] = React.useState("boxing");
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchSport() {
      const response = await wretch()
        .url(`https://gymate-restapi.herokuapp.com/sports/${offer.sportId}`)
        .get()
        .json();
      setSport(response.name);
      setLoading(false);
    }
    fetchSport();
  }, [offer]);
  return (
    <Card className={classes.root} elevation={0}>
      {!loading ? (
        <React.Fragment>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`${sport.toLowerCase()}.jpg`}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {offer.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {offer.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link href={`/offers/${offer.id}`}>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </Link>
          </CardActions>
        </React.Fragment>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </Card>
  );
};

export { OfferPopupInfo };
