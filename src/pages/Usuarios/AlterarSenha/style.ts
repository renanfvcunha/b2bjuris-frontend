import {
  makeStyles,
  Theme,
  createStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
// import { purple } from '@material-ui/core/colors';

import defaultStyles from '../../../utils/defaultStyles';

const passwdStyle = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      backgroundColor: defaultStyles.defaultBackground,
    },
    iconAdd: {
      marginRight: 8,
    },
    centerItems: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
    },
    form: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 600,
    },
    addProcessTitle: {
      marginTop: 12,
      color: defaultStyles.purpleDark,
      fontWeight: 'bold',
    },
    formRoot: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formBox: {
      borderRadius: 12,
      width: '100%',
    },
    tableBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '5%',
    },
    table: {
      width: '100%',
      maxWidth: 1140,
      height: 640,
    },
    title: {
      fontWeight: 'bold',
      margin: theme.spacing(1),
    },
    field: {
      margin: theme.spacing(1),
    },
    progress: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    addProccessBtn: {
      position: 'absolute',
      top: 12,
      left: 250,
    },
    subButton: {
      margin: theme.spacing(1),
      marginTop: 8,
    },
  })
);

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: '#fff',
      },
    },
    MuiTableSortLabel: {
      root: {
        '&:hover': {
          color: 'rgba(255, 255, 255, 0.75)',
        },
      },
    },
    MuiTableRow: {
      root: {
        '&:hover': {
          backgroundColor: '#f0f0f0 !important',
          cursor: 'default',
        },
      },
    },
  },
  palette: {
    primary: {
      main: defaultStyles.purpleLight,
    },
    secondary: {
      main: defaultStyles.purpleDark,
    },
  },
});

export default passwdStyle;
