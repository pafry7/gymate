import { NextPage } from "next";
import { Fragment, useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { AppointmentsList } from "components/AppointmentsList";
import wretch from "wretch";
import { useAuth } from "context/AuthContext";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  MonthView,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  Typography,
  Box,
  Drawer,
  makeStyles,
  fade,
  CircularProgress,
} from "@material-ui/core";

interface ScheduleProps {}

const useStyles = makeStyles((theme) => ({
  today: {
    backgroundColor: fade(theme.palette.primary.main, 0.16),
  },
}));

const TimeTableCell = ({ props, openDrawer, today, setClickedDate }) => {
  const handleClick = () => {
    setClickedDate(props.startDate);
    openDrawer();
  };
  if (props.today) {
    return (
      <MonthView.TimeTableCell
        {...props}
        onClick={handleClick}
        className={today}
      />
    );
  }
  return <MonthView.TimeTableCell {...props} onClick={handleClick} />;
};

const Schedule: NextPage<ScheduleProps> = () => {
  const classes = useStyles();
  const { state, dispatch } = useAuth();
  const [date, setDate] = useState(new Date());
  const [clickedDate, setClickedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

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

        const promises = response.map(async (res) => {
          const a = await wretch()
            .url(`https://gymate-restapi.herokuapp.com/offers/${res.offerId}`)
            .get()
            .json();
          return a;
        });
        const offers = await Promise.all(promises);
        const schedulerData = response.map((res) => {
          const endDate = new Date(res.eventDate);
          endDate.setHours(endDate.getHours() + 1);
          const obj = {
            startDate: res.eventDate,
            endDate,
            title: "",
          };
          offers.forEach((offer: any) => {
            if (offer.id === res.offerId) {
              obj.title = offer.name;
            }
          });
          return obj;
        });
        setReservations(schedulerData);
        setLoading(false);
      } catch (err) {}
    }
    fetchSport();
  }, [state.user]);

  const openDrawer = () => {
    setOpen(true);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const year = date.getFullYear();
  const month = date.toLocaleDateString(undefined, { month: "long" });

  return (
    <Fragment>
      <Paper style={{ marginTop: 32 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Typography variant="h2">{year}</Typography>
          <Typography variant="h1">{month}</Typography>
        </Box>
        {loading ? (
          <Box display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Scheduler data={reservations}>
              <ViewState />
              <MonthView
                timeTableCellComponent={(props) =>
                  TimeTableCell({
                    props,
                    openDrawer,
                    today: classes.today,
                    setClickedDate,
                  })
                }
              />
              <Appointments />
            </Scheduler>
          </>
        )}
      </Paper>
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer()}>
        <AppointmentsList date={clickedDate} appointments={reservations} />
      </Drawer>
    </Fragment>
  );
};

export default Schedule;
