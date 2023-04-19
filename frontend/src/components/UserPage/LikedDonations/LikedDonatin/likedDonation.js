import React , { useState } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from "./style";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';

import {format} from "timeago.js";


const LikedDonation = (userDonation) => {


   
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
   
    const [open, setOpen] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
      
      const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

    return (
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

export default LikedDonation;