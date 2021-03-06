import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Paper,
} from "@material-ui/core";
import {
  orange,
  green,
  red,
  purple,
  blue,
  pink,
  brown,
} from "@material-ui/core/colors";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import SportsMmaIcon from "@material-ui/icons/SportsMma";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SportsTennisIcon from "@material-ui/icons/SportsTennis";
import SportsKabaddiIcon from "@material-ui/icons/SportsKabaddi";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import PoolIcon from "@material-ui/icons/Pool";
import Link from "next/link";
import { Offer } from "pages/offers";

interface OffersListProps {
  offers: Offer[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      overflow: "auto",
      maxHeight: 800,
    },
    inline: {
      display: "inline",
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginRight: theme.spacing(3),
    },
  })
);
const ListAvatar = ({ type, className }: { type: number; className: any }) => {
  let background = null;
  let icon: any = null;
  switch (type) {
    case 6:
      background = orange[400];
      icon = FitnessCenterIcon;
      break;
    case 8:
      background = green[400];
      icon = FiberManualRecordIcon;
      break;
    case 4:
      icon = SportsMmaIcon;
      background = red[400];
      break;
    case 2:
      icon = SportsKabaddiIcon;
      background = purple[400];
      break;
    case 3:
      background = blue[400];
      icon = PoolIcon;
      break;
    case 7:
      background = pink[400];
      icon = SportsTennisIcon;
      break;
    case 5:
      background = brown[400];
      icon = FilterHdrIcon;
      break;
    default:
      background = orange[400];
      icon = PoolIcon;
  }
  const Icon = icon;
  return (
    <Avatar
      variant="rounded"
      style={{ color: "white", backgroundColor: background }}
      className={className}
    >
      <Icon />
    </Avatar>
  );
};
const OffersList: React.FC<OffersListProps> = ({ offers }) => {
  const classes = useStyles();
  return (
    <Paper>
      <List className={classes.root}>
        {offers.map((offer) => (
          <Link key={offer.id} href={`/offers/${offer.id}`}>
            <ListItem alignItems="flex-start" button>
              <ListItemAvatar>
                <ListAvatar className={classes.avatar} type={offer.sportId} />
              </ListItemAvatar>
              <ListItemText
                primary={offer.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {offer.description}
                    </Typography>
                    {` | ${offer.singlePrice} zł`}
                  </React.Fragment>
                }
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  );
};

export { OffersList };
