import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

import defaultStyles from '../../../utils/defaultStyles';

const useStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: defaultStyles.defaultBackground,
  },
  backBtn: {
    position: 'absolute',
    marginLeft: 12,
    marginTop: 12,
  },
  title: {
    marginTop: 12,
    color: defaultStyles.purpleDark,
    fontWeight: 'bold',
  },
  data: {
    margin: '40px 120px',
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

export const Purple = createMuiTheme({
  palette: {
    primary: {
      main: defaultStyles.purpleLight,
    },
    secondary: {
      main: defaultStyles.purpleDark,
    },
  },
});

/* export const Red = createMuiTheme({
  palette: {
    primary: {
      main: red['500'],
    },
  },
}); */

export default useStyles;
