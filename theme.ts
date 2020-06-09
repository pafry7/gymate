import { createMuiTheme } from "@material-ui/core";
import { red, green } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: green,
  },
});

export { theme };
