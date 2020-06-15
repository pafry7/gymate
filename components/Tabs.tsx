import React from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: any) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
}));

interface FullWidthTabsInterface {
  labels: any;
  children?: React.ReactNode[];
}
export const FullWidthTabs: React.FC<FullWidthTabsInterface> = ({
  labels,
  children,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        {labels.map((label, index) => (
          <Tab label={label} {...a11yProps(index)}></Tab>
        ))}
      </Tabs>
      {children.map((child, index) => (
        <TabPanel value={value} index={index} dir={theme.direction}>
          {child}
        </TabPanel>
      ))}
    </div>
  );
};
