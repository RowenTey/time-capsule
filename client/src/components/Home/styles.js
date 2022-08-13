import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    flexDirection: 'row'
  },
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection:'column-reverse'
    },
  },
}));