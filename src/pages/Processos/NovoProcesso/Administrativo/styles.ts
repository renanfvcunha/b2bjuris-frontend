import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  fieldsBox: {
    marginTop: 16,
    display: 'flex',
    justifyContent: 'center',
  },
  field: {
    margin: theme.spacing(1),
  },
}));

export default useStyles;
