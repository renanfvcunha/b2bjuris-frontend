import { createMuiTheme, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 'bold',
    margin: theme.spacing(1),
  },
  field: {
    margin: theme.spacing(1),
  },
}));

export const Red = createMuiTheme({
  palette: {
    primary: {
      main: red['500'],
    },
  },
});

export default useStyles;
