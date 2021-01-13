import {
  makeStyles,
  Theme,
  createStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

import defaultStyles from '../../../utils/defaultStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: `2px solid ${purple['100']}`,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 2, 1),
    },
    backBtn: {
      position: 'absolute',
    },
    form: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
      width: 800,
    },
    formBox: {
      backgroundColor: '#fff',
      borderRadius: 12,
      width: '100%',
    },
    formRoot: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontWeight: 'bold',
      margin: theme.spacing(1),
    },
    field: {
      margin: theme.spacing(1),
    },
    subButton: {
      margin: theme.spacing(1),
      marginTop: 8,
    },
  })
);

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

export default useStyles;
