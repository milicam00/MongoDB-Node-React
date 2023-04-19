import React, { useState } from "react";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import useStyles from "./style";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { deleteUsersVolunteering } from "../../../../actions/usersVolunteerings";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateUsersVolunteering } from "../../../../actions/usersVolunteerings";

import {format} from "timeago.js";


const Volunteering = (userVolunteering) => {

    
    const dispatch = useDispatch();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const user = JSON.parse(localStorage.getItem("profile"));
    const [open, setOpen] = React.useState(false);

    const [volunteeringData, setVolunteeringData] = useState({
      userId: user.user._id,
      creatorId:  userVolunteering.volunteering.creatorId,
      users: userVolunteering.volunteering.users,
      header: userVolunteering.volunteering.header,
      time: userVolunteering.volunteering.time,
      place: userVolunteering.volunteering.place,
      address: userVolunteering.volunteering.address,
      category: userVolunteering.volunteering.category,  
     
    });

    const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit =async (e) => {
 

  
  e.preventDefault();
 
    dispatch(updateUsersVolunteering(userVolunteering.volunteering._id, volunteeringData));
  
    setOpen(false);
};

    return (
         <Card className={classes.root}>
        <CardHeader
         
          title={userVolunteering.volunteering.header}
          subheader={format(userVolunteering.volunteering.createdAt)}
        />
        <CardMedia
         
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
                Grad: {userVolunteering.volunteering.place}
            </Typography>
            <Typography paragraph>
             Adresa: {userVolunteering.volunteering.address}
            </Typography>
            <Grid>
              <Button style={{color: '#118A7E'}} onClick={handleClickOpen}>Izmeni</Button>
                  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle style={{ backgroundColor: '#75bca7'}} id="form-dialog-title">Unesite nove podatke</DialogTitle>
                    <DialogContent style={{ backgroundColor: '#75bca7'}}>
                    <Grid container className={classes.dialog} >
                      
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
                        name="time"
                        variant="outlined"
                        label="Vreme"
                        value={volunteeringData.time}
                        fullWidth
                        onChange={(e) => setVolunteeringData({ ...volunteeringData, time: e.target.value })}
                      />
                      </Grid>
                       <Grid container className={classes.dialog3}>
                      <TextField
                        name="place"
                        variant="outlined"
                        label="Mesto"
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
                      <Button  style={{ backgroundColor: '#FEF7DC'}} onClick={handleClose} color="black">
                        Odustani
                      </Button>
                      <Button  style={{ backgroundColor: '#FEF7DC'}} onClick={handleSubmit} color="black">
                        Izmeni
                      </Button>
                    </DialogActions>
                  </Dialog>
              <Button   style={{color: '#118A7E'}} onClick={() => dispatch(deleteUsersVolunteering(userVolunteering.volunteering._id))}>Obrisi</Button>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    );
}

export default Volunteering;