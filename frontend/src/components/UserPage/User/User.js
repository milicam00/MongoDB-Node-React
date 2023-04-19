import React , {useEffect, useState }  from "react";
import { useDispatch } from "react-redux";
import useStyles from './style'
import {getUser } from '../../../actions/auth';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Delete, Edit} from '@material-ui/icons';
import { updateUser } from '../../../actions/auth';


import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const User = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));

   
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleSubmit =async (e) => {
       

      
      e.preventDefault();

        
        dispatch(updateUser(user.user._id, userData));
       
        setOpen(false);
    };
    
    const handleClose = () => {
        setOpen(false);
      };

    const [userData, setUserData] = useState({
        _id:  user.user._id,
        username: user.user.username,
        email: user.user.email,
        password: user.user.password,
        isAdministrator: user.user.isAdministrator,
        city: user.user.city,
        friends: user.user.friends,
        posts: user.user.posts,
        volunteerings: user.user.volunteerings,
        signedU: user.user.signedU,
        contact: user.user.contact,
        image: user.user.image,
        liked: user.user.liked,
      });
      const clear = () => {
        setUserData({
            username: user.user.username,
            email: user.user.email,
            password: user.user.password,
            city: user.user.city,
            contact: user.user.contact,
            isAdministrator: user.user.isAdministrator,
        });
      };
    
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root} variant="outlined" style={{backgroundColor: '#FEF7DC'}}>
      <CardContent >
       <Grid container className={classes.grid} items >
       <Grid items className={classes.grid1} style={{color: '#3bb19b'}}>
            <Grid items className={classes.grid11}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Ime i prezime
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {user.user.username}
                    </Typography>
            </Grid>
            <Grid items className={classes.grid11}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Email
                </Typography>
                <Typography variant="h5" component="h2">
                    {user.user.email}
                </Typography>
            </Grid>
           
            <Grid items className={classes.grid11}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Grad
                </Typography>
                <Typography variant="h5" component="h2">
                    {user.user.city} 
                </Typography>
            </Grid>
            <Grid items className={classes.grid11}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Kontant
                </Typography>
                <Typography variant="h5" component="h2">
                    {user.user.contact} 
                </Typography>
            </Grid>
       
       <Grid items className={classes.grid2}>
            
            <div>
      <Button  className={classes.btn} variant="outlined" color="primary" onClick={handleClickOpen}>
        Izmeni
      </Button>
      <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle style={{ backgroundColor: '#75bca7'}} id="form-dialog-title">Unesite nove podatke</DialogTitle>
        <DialogContent style={{ backgroundColor: '#75bca7'}}>
          <Grid container className={classes.dialog} >
         
          <Grid container className={classes.dialog1}>
          <TextField
          
            name="username"
            variant="outlined"
            label="Ime i prezime"
            value={userData.username}
            fullWidth
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          />
          </Grid>
          <Grid container className={classes.dialog2}>
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            value={userData.email}
            fullWidth
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          </Grid>
          <Grid container className={classes.dialog3}>
          <TextField
            name="password"
            variant="outlined"
            label="Lozinka"
            value={userData.password}
            fullWidth
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
          </Grid>
          <Grid container className={classes.dialog4}>
          <TextField
            name="city"
            variant="outlined"
            label="Grad"
            value={userData.city}
            fullWidth
            onChange={(e) => setUserData({ ...userData, city: e.target.value })}
          />
          </Grid>
          <Grid container className={classes.dialog5}>
          <TextField
            name="contact"
            variant="outlined"
            label="Kontakt"
            value={userData.contact}
            fullWidth
            onChange={(e) => setUserData({ ...userData, contact: e.target.value })}
          />
          </Grid>
          </Grid>
        </DialogContent>
        <DialogActions  style={{ backgroundColor: '#75bca7'}}>
          <Button style={{ backgroundColor: '#FEF7DC'}}  onClick={handleClose} color="black">
            Odustani
          </Button>
          <Button style={{ backgroundColor: '#FEF7DC'}} onClick={handleSubmit} color="black">
            Izmeni
          </Button> 
        </DialogActions>
      </Dialog>
    </div>
       </Grid>
       </Grid>
       </Grid>
      </CardContent>
     
    </Card>

    );
}

export default User;