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
  fieldsBoxLeft: {
    display: 'block',
    margin: `${theme.spacing(3)}px 150px 0 150px`,
  },
}));

export default useStyles;
