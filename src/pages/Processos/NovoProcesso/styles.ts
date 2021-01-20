import { createMuiTheme, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

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
    backgroundColor: defaultStyles.defaultBoxBackground,
    maxWidth: 1140,
    height: 640,
  },
  backBtn: {
    position: 'absolute',
    marginLeft: 12,
    marginTop: 12,
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
  attachments: {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: '16px 150px 0 150px',
    flexWrap: 'wrap',
  },
  field: {
    margin: theme.spacing(1),
  },
  tipoProcesso: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
  },
  fieldsBoxLeft: {
    display: 'block',
    margin: `${theme.spacing(3)}px 150px 0 150px`,
  },
  tipoProcessoItems: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

export const Red = createMuiTheme({
  palette: {
    primary: {
      main: red['500'],
    },
  },
});

export default useStyles;
