import { makeStyles } from '@material-ui/core/styles';

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
