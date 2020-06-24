import { NextPage, GetServerSideProps } from "next";
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
import { Typography, Box, Drawer, makeStyles, fade } from "@material-ui/core";

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
  const [offer, setOffer] = useState(null);

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

        const schedulerData = reservations?.map((res) => {
          const endDate = new Date(res.eventDate);
          endDate.setHours(endDate.getHours() + 1);
          return { startDate: res.eventDate, endDate, title: offer.name };
        });
        setReservations(schedulerData);

        const offer = await wretch()
          .url(
            `https://gymate-restapi.herokuapp.com/offers/${response[0].offerId}`
          )
          .get()
          .json();
        setOffer(offer);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchSport();
  }, []);

  console.log(reservations);
  const openDrawer = () => {
    setOpen(true);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const year = date.getFullYear();
  const month = date.toLocaleDateString(undefined, { month: "long" });

  // const schedulerData = reservations?.map((res) => {
  //   const endDate = new Date(res.eventDate);
  //   endDate.setHours(endDate.getHours() + 1);
  //   return { startDate: res.eventDate, endDate, title: offer.name };
  // });
  const schedulerData = [
    {
      startDate: "2020-06-20T09:45",
      endDate: "2020-06-20T11:00",
      title: "Meeting",
    },
    {
      startDate: "2020-06-20T12:00",
      endDate: "2020-06-20T13:30",
      title: "Go to a gym",
    },
  ];

  return (
    <Fragment>
      <Paper style={{ marginTop: 32 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Typography variant="h2">{year}</Typography>
          <Typography variant="h1">{month}</Typography>
        </Box>
        {/* {loading ? (
          <div>test</div>
        ) : ( */}
        <>
          <Scheduler data={schedulerData}>
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
        {/* )} */}
      </Paper>
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer()}>
        <AppointmentsList date={clickedDate} appointments={schedulerData} />
      </Drawer>
    </Fragment>
  );
};

export default Schedule;
