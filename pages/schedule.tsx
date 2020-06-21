import { NextPage, GetServerSideProps } from "next";
import { Fragment, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { AppointmentsList } from "components/AppointmentsList";
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
    console.log(props);
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
  const [date, setDate] = useState(new Date());
  const [clickedDate, setClickedDate] = useState(null);
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const year = date.getFullYear();
  const month = date.toLocaleDateString(undefined, { month: "long" });

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
      </Paper>
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer()}>
        <AppointmentsList date={clickedDate} appointments={schedulerData} />
      </Drawer>
    </Fragment>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   let response = await new Promise((res, rej) => {
//     setTimeout(() => {
//       res(offers);
//     }, 1000);
//   });

//   return {
//     props: {
//       response,
//     },
//   };
// };
export default Schedule;
