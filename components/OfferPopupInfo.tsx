import React from "react";
import { Offer } from "mocks/offers";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
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

  return (
    <Card className={classes.root} elevation={0}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/gym.jpg"
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
    </Card>
  );
};

export { OfferPopupInfo };
