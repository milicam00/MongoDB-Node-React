import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    root: {
      //maxWidth: 300,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
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
      dialog5:{
       marginTop: '1.3rem'
      },
  }));