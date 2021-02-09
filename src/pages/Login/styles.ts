import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

import defaultStyles from '../../utils/defaultStyles';

const useStyles = makeStyles(theme => ({
  content: {
    minHeight: '100vh',
    background: 'url("/assets/images/loginBackground.png")',
    backgroundSize: 'cover',
  },
  paper: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    '& .MuiInputBase-root': {
      backgroundColor: '#e7e7e7',
    },
  },
  lembrar: {
    color: '#e7e7e7',
    marginLeft: 0,
    '& .MuiCheckbox-root': {
      color: '#e7e7e7',
    },
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Theme = createMuiTheme({
  palette: {
    primary: {
      main: defaultStyles.purpleDark,
    },
    secondary: {
      main: defaultStyles.purpleLight,
    },
  },
});

export default useStyles;
