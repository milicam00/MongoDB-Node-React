import React, { useState } from 'react';
import useStyles from "./style";
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { deleteUsersDonation } from '../../../../../actions/usersDonations';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { updateUsersDonation } from '../../../../../actions/usersDonations';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { donateToPost } from '../../../../../actions/donations';
import {format} from 'timeago.js';

const Post = (donation) => {

   
    const dispatch = useDispatch();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const user = JSON.parse(localStorage.getItem("profile"));
    const [open, setOpen] = React.useState(false);
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  

  const [donationData, setDonationData] = useState({
    userId: user?.user._id,
    creatorId:  donation.donation.creatorId,
    creatorName: donation.donation.creatorName,
    header: donation.donation.header,
    data: donation.donation.data,
    isRequest: donation.donation.isRequest,
    categories: donation.donation.categories,
    city: donation.donation.city,
    address: donation.donation.address,
    contact: donation.donation.contact,
    donators: donation.donation.donators,
    active: donation.donation.active,
    image: donation.donation.image,
   
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
   
    if(user?.user._id == donationData?.creatorId)
    {
       navigate("/userpage");
    }
    else{
      navigate("/profile", {state: {d : donation.donation}});
    }
   
  }
  const changeColor = () => {
      setIsActive(!isActive);
  };

  const handleSubmit =async (e) => {
   
 
  e.preventDefault();
  
    dispatch(updateUsersDonation(donation.donation._id, donationData));
  
    setOpen(false);
};
    return(
        <Card className={classes.root}>
        <CardHeader
         
          title={donation.donation.header}
          subheader={format(donation.donation.createdAt)}
        />
        <CardMedia
          className={classes.media}
          image={donation.donation.image}
          title="Slika"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {donation.donation.data}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>

        {(user?.user)&&(
          <IconButton aria-label="add to favorites" style={{color : isActive ? 'red' : '#a3a3a3'}} onClick={() => {changeColor(); dispatch(donateToPost(donation.donation._id, {userId: user.user._id}))}
          
        }>
            <FavoriteIcon />
          </IconButton>
        )}
         
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
          <Button size="small" style={{color: '#118A7E'}} variant='text' onClick={handleClick}>
              Donator: {donation.donation.creatorName}
            </Button> 
         
            <Typography paragraph>
                Grad: {donation.donation.city}
            </Typography>
            <Typography paragraph>
             Adresa: {donation.donation.address}
            </Typography>
            <Typography paragraph>
             Kontakt: {donation.donation.contact}
            </Typography>
            {(user)&&(user.user.isAdministrator)&&(
                  <Grid>
                  <Button color="primary" onClick={handleClickOpen}>Izmeni</Button>
                      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle  style={{ backgroundColor: '#75bca7'}} id="form-dialog-title">Unesite nove podatke</DialogTitle>
                        <DialogContent  style={{ backgroundColor: '#75bca7'}}>
                        <Grid container className={classes.dialog} >
                         
                          <Grid container className={classes.dialog1}>
                          <TextField
                            name="header"
                            variant="outlined"
                            label="Naslov"
                            value={donationData.header}
                            fullWidth
                            onChange={(e) => setDonationData({ ...donationData, header: e.target.value })}
                          />
                          </Grid>
                         <Grid container className={classes.dialog2}>
                          <TextField
                            name="data"
                            variant="outlined"
                            label="Opis"
                            value={donationData.data}
                            fullWidth
                            onChange={(e) => setDonationData({ ...donationData, data: e.target.value })}
                          />
                           </Grid>
                         <Grid container className={classes.dialog3}>
                          <TextField
                            name="city"
                            variant="outlined"
                            label="Grad"
                            value={donationData.city}
                            fullWidth
                            onChange={(e) => setDonationData({ ...donationData, city: e.target.value })}
                          />
                           </Grid>
                           <Grid container className={classes.dialog4}>
                          <TextField
                            name="address"
                            variant="outlined"
                            label="Adresa"
                            value={donationData.address}
                            fullWidth
                            onChange={(e) => setDonationData({ ...donationData, address: e.target.value })}
                          />
                          </Grid>
                           <Grid container className={classes.dialog5}>
                          <TextField
                            name="contact"
                            variant="outlined"
                            
                            label="Kontakt"
                            value={donationData.contact}
                            fullWidth
                            onChange={(e) => setDonationData({ ...donationData, contact: e.target.value })}
                          />
                           </Grid>
                           </Grid>
                        </DialogContent>
                        <DialogActions  style={{ backgroundColor: '#75bca7'}}>
                          <Button style={{ backgroundColor: '#FEF7DC'}} onClick={handleClose} color="black">
                            Odustani
                          </Button>
                          <Button style={{ backgroundColor: '#FEF7DC'}} onClick={handleSubmit} color="black">
                            Izmeni
                          </Button>
                        </DialogActions>
                      </Dialog>
                  <Button size="small" style={{color: '#118A7E'}} onClick={() => dispatch(deleteUsersDonation(donation.donation._id, user.user._id))}>
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
