import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root:{
    boxShadow: '4px 4px 8px 5px #118A7E',
    borderRadius: '15px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
   
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  gridd: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
    marginTop: '1rem'
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
  slika: {
    marginLeft: '2rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    
  },
  gridd:{
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: 'white'
  },
  div:{
    display: 'flex',
    flexDirection: 'row',
  
  },
  btnObrisi :{
    justifyContent: 'flex-end',
    

  }
});