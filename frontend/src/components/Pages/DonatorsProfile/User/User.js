import React , {useEffect, useState }  from "react";
import { useDispatch } from "react-redux";
import useStyles from './style'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Delete, Edit} from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const User = ({currentUser}) => {

    const classes = useStyles();
    const dispatch = useDispatch();
   

    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
   
    
    const handleClose = () => {
        setOpen(false);
      };

    
    
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card container className={classes.root} variant="outlined" style={{backgroundColor: '#FEF7DC'}}>
      <CardContent>
       <Grid container className={classes.grid} items >
       <Grid items className={classes.grid1} style={{color: '#3bb19b'}}>
            <Grid items className={classes.grid11}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Ime i prezime
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {currentUser.username}
                    </Typography>
            </Grid>
            <Grid items className={classes.grid11}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Email
                </Typography>
                <Typography variant="h5" component="h2">
                    {currentUser.email}
                </Typography>
            </Grid>
           
            <Grid items className={classes.grid11}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Grad
                </Typography>
                <Typography variant="h5" component="h2">
                    {currentUser.city} 
                </Typography>
            </Grid>
            <Grid items className={classes.grid11}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Kontant
                </Typography>
                <Typography variant="h5" component="h2">
                    {currentUser.contact} 
                </Typography>
            </Grid>
       </Grid>
       <Grid items className={classes.grid2}>
           
            <div>
    
    </div>
       </Grid>
       </Grid>
      </CardContent>
    
    </Card>

    );
}

export default User;