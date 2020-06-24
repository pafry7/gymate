import {
  Paper,
  Box,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import Link from "next/link";
import { Search } from "@material-ui/icons";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { disciplines } from "mocks/offers";

import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      textAlign: "center",
      paddingBottom: theme.spacing(8),
      paddingTop: theme.spacing(8),
    },
    textFieldBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    textField: {
      marginRight: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220,
    },
  })
);

const ActivitiesSearch = () => {
  const classes = useStyles();
  const [discipline, setDiscipline] = useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDiscipline(event.target.value as string);
  };

  return (
    <Paper
      elevation={1}
      className={`${classes.textFieldBox} ${classes.box}`}
      component="section"
    >
      <Box>
        <h1>Find activities in your area</h1>
        <form noValidate autoComplete="off">
          <Box className={classes.textFieldBox}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Discipline</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                value={discipline}
                onChange={handleChange}
              >
                <MenuItem value="All">All</MenuItem>
                {disciplines.map((discipline, index) => (
                  <MenuItem key={index} value={discipline}>
                    {discipline}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Link
              href={{
                pathname: "/offers",
                query: { discipline: discipline },
              }}
            >
              <IconButton aria-label="delete" edge="start" size="medium">
                <Search />
              </IconButton>
            </Link>
          </Box>
        </form>
      </Box>
    </Paper>
  );
};

export { ActivitiesSearch };
