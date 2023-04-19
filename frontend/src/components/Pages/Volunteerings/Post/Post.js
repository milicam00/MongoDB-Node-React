import React, { useState }  from 'react';
import useStyles from "./style";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { deleteUsersVolunteering } from '../../../../actions/usersVolunteerings';
import { updateUsersVolunteering } from '../../../../actions/usersVolunteerings';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from '@material-ui/core';
import { format } from "timeago.js";

const Post = (volunteering) => {
   

    console.log(volunteering.volunteering);

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));
    const [open, setOpen] = React.useState(false);

    const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //console.log(user);
  console.log(user?.user._id);
  console.log(volunteering.volunteering._id);
  const [currentUserId, setCurrentUserId] = useState({
    userId: user?.user._id
  });

  console.log(currentUserId);
  
  const [volunteeringData, setVolunteeringData] = useState({
    userId: user?.user._id,
    creatorId:  volunteering.volunteering.creatorId,
    users: volunteering.volunteering.users,
    header: volunteering.volunteering.header,
    time: volunteering.volunteering.time,
    place: volunteering.volunteering.place,
    address: volunteering.volunteering.address,
    category: volunteering.volunteering.category,
   
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit =async (e) => {
    
  console.log( volunteering.volunteering.category);
  console.log(volunteeringData.category);
  console.log(volunteeringData);
  e.preventDefault();
  console.log(volunteering.volunteering._id);
    dispatch(updateUsersVolunteering(volunteering.volunteering._id, volunteeringData));
   // clear();
    setOpen(false);
};

    return(
        <Card className={classes.root}>
        <CardHeader
          title={volunteering.volunteering.header}
          
        />
        
        <CardActions disableSpacing>
         
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
         
            <Typography paragraph>
                Mesto: {volunteering.volunteering.place}
            </Typography>
            <Typography paragraph>
             Adresa: {volunteering.volunteering.address}
            </Typography>
            <Typography paragraph>
             Vreme: {format(volunteering.volunteering.time)}
            </Typography>
            {(user)&&(user.user.isAdministrator)&&(
               <Grid>
               <Button  style={{color: '#118A7E'}} onClick={handleClickOpen}>Izmeni</Button>
                   <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                     <DialogTitle  style={{ backgroundColor: '#75bca7'}} id="form-dialog-title">Unesite nove podatke</DialogTitle>
                     <DialogContent  style={{ backgroundColor: '#75bca7'}}>
                     <Grid container className={classes.dialog} >
                       {/* <DialogContentText>
                         Ubacite nove podatke
                       </DialogContentText> */}
                       <Grid container className={classes.dialog1}>
                       <TextField
                         name="header"
                         variant="outlined"
                         label="Naslov"
                         value={volunteeringData.header}
                         fullWidth
                         onChange={(e) => setVolunteeringData({ ...volunteeringData, header: e.target.value })}
                       />
                       </Grid>
                       <Grid container className={classes.dialog2}>
                       <TextField
                         name="data"
                         variant="outlined"
                         label="Opis"
                         value={volunteeringData.time}
                         fullWidth
                         onChange={(e) => setVolunteeringData({ ...volunteeringData, timea: e.target.value })}
                       />
                        </Grid>
                      <Grid container className={classes.dialog3}>
                       <TextField
                         name="city"
                         variant="outlined"
                         label="Grad"
                         value={volunteeringData.place}
                         fullWidth
                         onChange={(e) => setVolunteeringData({ ...volunteeringData, place: e.target.value })}
                       />
                        </Grid>
                      <Grid container className={classes.dialog4}>
                       <TextField
                         name="address"
                         variant="outlined"
                         label="Adresa"
                         value={volunteeringData.address}
                         fullWidth
                         onChange={(e) => setVolunteeringData({ ...volunteeringData, address: e.target.value })}
                       />
                        </Grid>
                      </Grid>
                     </DialogContent>
                     <DialogActions style={{ backgroundColor: '#75bca7'}}>
                       <Button style={{ backgroundColor: '#FEF7DC'}} onClick={handleClose} color="black">
                         Odustani
                       </Button>
                       <Button style={{ backgroundColor: '#FEF7DC'}} onClick={handleSubmit} color="black">
                         Izmeni
                       </Button>
                     </DialogActions>
                   </Dialog>
                  <Button size="small"  style={{color: '#118A7E'}} onClick={() => dispatch(deleteUsersVolunteering(volunteering.volunteering._id, currentUserId))}>
                        Obrisi
                  </Button>
                  </Grid>
                )}
          </CardContent>
        </Collapse>
      </Card>
    );
}

export default Post;
