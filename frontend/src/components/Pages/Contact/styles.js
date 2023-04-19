import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundImage:`url("https://tolko.com/wp-content/uploads/2019/04/Volunteering_banner1-small.jpg")`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",

  },
  main: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(7),
    
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
  },
  tekst:{
    borderStyle:"solid",
    borderWidth:"0px 0px 0px 0px",
    backgroundColor:"rgba(0,0,0,.4)",
    color:"#EEC591",
    padding:"1rem 1.8rem"
    
  },
  info:{
    borderStyle:"solid",
    borderWidth:"0px 0px 0px 0px",
    backgroundColor:"rgba(0,0,0,.4)",
    color:"white",
    marginBottom: theme.spacing(7),
    padding:"1rem 1.2rem",
    textAlign:"center"

  }
}));