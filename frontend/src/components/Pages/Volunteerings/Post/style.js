import { makeStyles } from "@material-ui/core/styles";
import { Height } from "@material-ui/icons";

export default makeStyles((theme) => ({
    root: {
      maxWidth: 300,
      minHeight: 50
    },
    media: {
      height: 0,
      paddingTop: '46.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    dialog:{
      display: 'flex',
       direction: 'row',
       //justifyContent: 'space-between',
       alignItems: 'space-between',
     },
     dialog1:{
       marginTop: '1.3rem'
      },
      dialog2:{
       marginTop: '1.3rem'
      },
      dialog3:{
       marginTop: '1.3rem'
      },
      dialog4:{
       marginTop: '1.3rem'
      },
  }));