import { makeStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: purple['50'],
  },
  /* lastForms: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastFormsBox: {
    width: '30%',
  },
  lastFormsBtn: {
    textTransform: 'none',
    width: '100%',
  }, */
}));

export default useStyles;
