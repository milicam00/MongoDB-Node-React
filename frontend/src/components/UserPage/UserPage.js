import React, {useState, useEffect } from "react";
import { Paper, Typography, Button ,Avatar, AppBar,Tab, Card, Container} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux"
import { Grid } from "@material-ui/core";
import useStyles from "./style";
import SimpleTabs from './Tabs/SimpleTabs'
import { getUserDonations} from "../../actions/usersDonations";
import { getUserVolunteerings} from "../../actions/usersVolunteerings";
import { getUsers } from "../../actions/auth";
import FileBase from 'react-file-base64';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { updateUser } from "../../actions/auth";
import { getUser } from "../../actions/auth";
import { adImage } from "../../actions/auth";

const UserPage = () => {
     const dispatch = useDispatch();
      const classes = useStyles();
     const [currentUserId, setCurrentUserId] = useState(0);
     const [currentDonations, setcurrentDonations] = useState([]);
     const user = JSON.parse(localStorage.getItem("profile"));
    

     const [userData, setUserData] = useState({
      userId: user?.user._id,
      username: user?.user.username,
      email: user?.user.email,
      password: user?.user.password,
      isAdministrator: user?.user.isAdministrator,
      city: user?.user.city,
      friends: user?.user.friends,
      posts: user?.user.posts,
      volunteerings: user?.user.volunteerings,
      signedU: user?.user.signedU,
      contact: user?.user.contact,
      image: user?.user.image,
      liked: user?.user.liked,
    });


     
   
    
     useEffect(() => {
       if(user?.user)
       dispatch(getUserDonations(user?.user._id)) ;

     },[dispatch,currentUserId]);
   
     useEffect(() => {
       if(user?.user)
       dispatch(getUserVolunteerings(user?.user._id));
     }, []);

     useEffect(() => {
      if(user?.user)
      dispatch(getUsers());
    }, []);

    const handleSubmit = async (base64, e) => {
     
      dispatch(adImage(user?.user._id, {userId: user?.user._id, image:base64}))
      
    };
   
    
      if(!user || !user.user){
        return(
          <Paper className={classes.paper}>
          <Typography gutterBottom variant="h6" component="h3">
             Morate da se ulogujete da bi pristupili ovoj stranici.
          </Typography>
        </Paper>
        );
      }
    

    return(
      <div>
     
        <Grid container direction="column" spacing={3} className={classes.glavni}>
          <Grid item className={classes.grid}>
              <Grid  item className={classes.grid1} >
                {
                  user.user.image ? (<Avatar variant='square' className={classes.img} src={user.user.image}>
                    
                  </Avatar>):
                  (
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                        <div className='container mr-60'>
                        <FileBase type="file" multiple={false} onDone={({base64})=> handleSubmit(base64)}/>
                   
                      </div> 
                    </IconButton>
                  )
                }
                
              
              </Grid>
                
            </Grid>
           
            <Grid item className={classes.grid2} lg={13} md={13} >
              <SimpleTabs />
            </Grid>
            
        </Grid>
      
      </div>
      

    );
};

export default UserPage;