import { createMuiTheme, makeStyles } from '@material-ui/core';
import { blue, green } from '@material-ui/core/colors';

import defaultStyles from '../../../utils/defaultStyles';

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: 12,
    color: defaultStyles.purpleDark,
    fontWeight: 'bold',
  },
  data: {
    margin: theme.spacing(2),
    minWidth: 600,
    maxWidth: 800,
  },
  key: {
    fontSize: 24,
    fontWeight: 'bold',
    color: defaultStyles.purpleLight,
  },
  value: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 500,
  },
}));

export const Buttons = createMuiTheme({
  palette: {
    primary: {
      main: blue['600'],
    },
    secondary: {
      main: green['600'],
    },
  },
});

export default useStyles;
