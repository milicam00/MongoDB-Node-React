import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import useStyles from './styles'




export default function Contact() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
   
      <Container component="main" className={classes.main} maxWidth="sm">
       
        <Typography className={classes.tekst} variant="h5" component="h2" gutterBottom>
          {'Želimo da kao jedna uspesna humanitarna organizacja okupimo naše ljude i naš narod, ma gde živeli i koliko god nas kilometara delilo u ljubavi i saosećaju.. '}
          {'Da zajedništvom vratimo nadu da nisu zaboravljeni oni među nama koji žive loše, koji sami ne mogu ili ne umeju, koje često ne vidimo, a sistem ih ne prepoznaje. '}
          {'Da dobiju priliku da ih svi vide i čuju, da im pomognu.To je naša BeHuman organizacija… '}
          {'Tačka spajanja onih među nama koji mogu i hoće, za naše ljude koji ne mogu, a mi smo im potrebni.'}
          {'Mi hoćemo i želimo, pomozite nam da uspemo. '}
          {'Za njih, za vas, za sve naše ljude.'}
        </Typography>
        
      </Container>
      
        <Container className={classes.info} maxWidth="sm">
          
                <Typography>
                   <h1> EMAIL: behuman@gmail.com</h1>
                   <h1>TELEFON: 037/359-9898</h1>
                   <h1>INSTAGRAM: @behuman</h1> 
                    <h1>FACEBOOK: Be Human</h1>
                </Typography>
          
        </Container>
      
    </div>
  );
}