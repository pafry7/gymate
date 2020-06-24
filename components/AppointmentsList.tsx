import React, { Fragment } from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";

import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  DayView,
} from "@devexpress/dx-react-scheduler-material-ui";

interface AppointmentsListProps {
  date: any;
  appointments?: any;
}

const useStyles = makeStyles((theme) => ({
  main: {
    width: "620px",
    height: "200px",
    color: "white",
  },
}));

const TimeTableCell = (props) => {
  const handleClick = () => {};
  return (
    <DayView.DayScaleCell
      {...props}
      formatDate={() => null}
      onClick={handleClick}
    />
  );
};

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  date,
  appointments,
}) => {
  const classes = useStyles();

  const weekDay = date.toLocaleDateString(undefined, { weekday: "long" });
  const day = date.toLocaleDateString(undefined, { day: "numeric" });

  return (
    <Box style={{ maxWidth: 620 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="space-around"
        mb={2}
        pl={4}
        className={classes.main}
        style={{
          background:
            "linear-gradient(90deg, rgba(0,150,136,1) 0%, rgba(221,237,195,1) 81%)",
        }}
      >
        <Typography variant="h2">{day}</Typography>
        <Typography variant="h3">{weekDay}</Typography>
      </Box>
      <Scheduler data={appointments}>
        <ViewState currentDate={date} />
        <DayView
          startDayHour={6}
          endDayHour={22}
          cellDuration={60}
          dayScaleCellComponent={TimeTableCell}
        />
        <Appointments />
      </Scheduler>
    </Box>
  );
};

export { AppointmentsList };
