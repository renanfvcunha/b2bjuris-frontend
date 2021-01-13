import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

import defaultStyles from '../../utils/defaultStyles';

const useStyles = makeStyles(theme => ({
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
  addUserBtn: {
    position: 'absolute',
    top: 12,
    left: 190,
  },
}));

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
      main: '#654d7d',
    },
    secondary: {
      main: '#462e5e',
    },
  },
});

export default useStyles;
