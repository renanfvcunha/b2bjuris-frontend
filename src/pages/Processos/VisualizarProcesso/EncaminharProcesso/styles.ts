import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 'bold',
    margin: theme.spacing(1),
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    width: 400,
  },
  form: {
    width: '100%',
  },
  field: {
    margin: theme.spacing(1),
  },
  subButton: {
    margin: theme.spacing(1),
    marginTop: 8,
  },
}));

export default useStyles;
