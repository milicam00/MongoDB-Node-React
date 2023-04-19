import { makeStyles } from "@material-ui/core/styles";

export default  makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: 500,
    minHeight: 300,
    WebkitBorderRadius: '2rem',
    boxShadow: '4px 4px 11px 8px #75bca7'
  },
  grid:{
    display: 'flex',
    marginLeft: '4rem',
    marginTop: '2rem'
  },
  grid11:{
    height: 90,
  },
  grid2:{
    alignItems: 'flex-end'
  },
  grid1:{

  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
  btn:{
    //float: 'right'
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