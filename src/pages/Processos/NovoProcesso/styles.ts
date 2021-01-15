import { createMuiTheme, makeStyles } from '@material-ui/core';

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
  contentArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  addProcessBox: {
    width: '100%',
    backgroundColor: '#fff',
    maxWidth: 1140,
    height: 640,
  },
  addProcessTitle: {
    marginTop: 12,
    color: defaultStyles.purpleDark,
    fontWeight: 'bold',
  },
  fieldsBox: {
    marginTop: 16,
    display: 'flex',
    justifyContent: 'center',
  },
  field: {
    margin: theme.spacing(1),
  },
  tipoProcesso: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
  },
  subButtonBox: {
    marginTop: 48,
    display: 'flex',
    justifyContent: 'center',
  },
  subButton: {
    width: 400,
    height: 42,
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

export default useStyles;
