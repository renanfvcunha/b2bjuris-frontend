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
  title: {
    marginTop: 12,
    color: defaultStyles.purpleDark,
    fontWeight: 'bold',
  },
  encList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default useStyles;
