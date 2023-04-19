import { makeStyles } from "@material-ui/core/styles";

export default  makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: 500,
    width: 500,
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
      alignItems: 'center'
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
  }));