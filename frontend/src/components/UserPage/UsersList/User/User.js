import React, { useState }  from "react";
import { Card, CardActions, Button, Typography } from '@material-ui/core/';
import { Delete, Edit, SettingsBackupRestoreOutlined} from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { deleteUser } from "../../../../actions/auth";
import useStyles from './style';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const User = ({user, currentUserId}) => {

  const initialState = {userId: currentUserId};
    const dispatch = useDispatch();
    const classes = useStyles();
    const [userId, setUserId] = useState(initialState);
   
   
    return(
      <Card className={classes.root}>
      <Card className={classes.card} raised elevation={6} >
        <div className={classes.div}>
      <Grid direction="row" container className={classes.gridd} style={{backgroundColor: '#75bca7'}}>

        <Avatar className={classes.slika} src={user.image} />
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{user.username}</Typography>
        
        </Grid>
        <Grid  container className={classes.btnObrisi} style={{backgroundColor: '#75bca7'}}>
        <CardActions className={classes.cardActions}>
            <Button  size="small" style={{color: 'white'}} onClick={() => dispatch(deleteUser(user._id,userId))}>
              <Delete fontSize="small" /> &nbsp; Obrisi
             
            </Button>
        </CardActions>
        </Grid>
        </div>
       </Card>
   </Card>
    );
};

export default User;