import React , { useState } from 'react';
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
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from "./style";
import usersDonations from '../../../../reducers/usersDonations';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { deleteUsersDonation } from '../../../../actions/usersDonations';
import { useDispatch } from 'react-redux';
import  ResponsiveDialog  from './UpdateDonation';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateUsersDonation } from '../../../../actions/usersDonations';
import {format} from "timeago.js";


const Donation = (userDonation) => {
   
    
    const dispatch = useDispatch();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const user = JSON.parse(localStorage.getItem("profile"));
    const [open, setOpen] = React.useState(false);

    const [donationData, setDonationData] = useState({
      userId: user.user._id,
      creatorId:  userDonation.donation.creatorId,
      creatorName: userDonation.donation.creatorName,
      header: userDonation.donation.header,
      data: userDonation.donation.data,
      isRequest: userDonation.donation.isRequest,
      categories: userDonation.donation.categories,
      city: userDonation.donation.city,
      address: userDonation.donation.address,
      contact: userDonation.donation.contact,
      donators: userDonation.donation.donators,
      active: userDonation.donation.active,
      image: userDonation.donation.image,
     
    });
    const [userID, setUserID] = useState({
      userId: userDonation.donation.creatorId
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
 
    dispatch(updateUsersDonation(userDonation.donation._id, donationData));
   
    setOpen(false);
};

    return(
        <Card className={classes.root}>
        <CardHeader
         
          title={userDonation.donation.header}
          subheader={format(userDonation.donation.createdAt)}
        />
        <CardMedia
          className={classes.media}
         
          image={userDonation.donation.image}
          title="Slika"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {userDonation.donation.data}
          </Typography>
        </CardContent>
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
                Grad: {userDonation.donation.city}
            </Typography>
            <Typography paragraph>
             Adresa: {userDonation.donation.address}
            </Typography>
            <Grid>
              <Button style={{color: '#118A7E'}} onClick={handleClickOpen}>Izmeni</Button>
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
                    <DialogActions style={{ backgroundColor: '#75bca7'}}>
                      <Button style={{ backgroundColor: '#FEF7DC'}} onClick={handleClose} color="black">
                        Odustani
                      </Button>
                      <Button style={{ backgroundColor: '#FEF7DC'}} onClick={handleSubmit} color="black">
                        Izmeni
                      </Button>
                    </DialogActions>
                  </Dialog>
              <Button style={{color: '#118A7E'}} onClick={() => dispatch(deleteUsersDonation(userDonation.donation._id, userID))}>Obrisi</Button>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    );
}

export default Donation;