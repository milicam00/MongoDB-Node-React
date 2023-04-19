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
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {format} from "timeago.js";

const Donation = (userDonation) => {
   
   
    const dispatch = useDispatch();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const user = JSON.parse(localStorage.getItem("profile"));
    const [open, setOpen] = React.useState(false);

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
          </CardContent>
        </Collapse>
      </Card>
    );
}

export default Donation;