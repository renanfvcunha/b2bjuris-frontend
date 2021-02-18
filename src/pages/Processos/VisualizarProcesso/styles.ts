import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { blue, green, red } from '@material-ui/core/colors';

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
  btnDownloadFile: {
    padding: 0,
    cursor: 'pointer',
    marginRight: 8,
  },
  textRed: {
    color: red['500'],
  },
  textBlue: {
    color: blue['500'],
  },
  buttons: {
    float: 'right',
    marginRight: 120,
    marginBottom: 12,
  },
  btn: {
    marginLeft: 8,
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
