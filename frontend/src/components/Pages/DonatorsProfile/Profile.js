import React, {useState, useEffect } from "react";
import { Paper, Typography, Button ,Avatar, AppBar,Tab, Card, Container} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux"
import { Grid } from "@material-ui/core";
import useStyles from "./style";
import SimpleTabs from "./Tabs/SimpleTabs";
import { getUserDonations } from "../../../actions/usersDonations";
import { getUserVolunteerings } from "../../../actions/usersVolunteerings";
import { useNavigate, useLocation } from "react-router-dom";
import { getUser } from "../../../actions/auth";
import { adFriend } from "../../../actions/auth";
import { getOneUser } from "../../../actions/auth";
import { createConversation, getConversation } from "../../../actions/conversations.js";

const user_me = JSON.parse(localStorage.getItem("profile"));

const Profile = () => {

    const navigate = useNavigate();

    const location = useLocation();
  
     const dispatch = useDispatch();
      const classes = useStyles();
     const [currentUserId, setCurrentUserId] = useState(0);
     const [currentDonations, setcurrentDonations] = useState([]);
    
  
     const donation = location.state?.d;
   

   

    useEffect(() => {
        
        if(donation)
        dispatch(getUser(donation?.creatorId));
      }, []);

      useEffect(() => {
       
        dispatch(getOneUser(donation?.creatorId));
      }, []);

    const { authData, isLoading, user } = useSelector(state => state.auth);

     

    const makeConversation = async () => {
      dispatch(createConversation(user_me?.user._id, donation.creatorId));
      navigate('/messenger');
    }

    useState(() => {
      dispatch(getOneUser(donation.creatorId));
     
    }, [])

    return(
  
        <Grid container direction="column" spacing={3} className={classes.glavni} style={{backgroundColor: '#FEF7DC'}}>
          <Grid item container className={classes.grid} spacing={5} >
              <Grid  item className={classes.grid1}  >
                <Avatar variant='square' className={classes.img} src={user.image}>
                    
                </Avatar>
              
              </Grid>
              
              {(user_me)&&(user_me?.user._id !== user?._id)&&(
                <Grid container className={classes.btn} >
                <Button className={classes.add} variant="outlined" aria-label="add to favorites"  onClick={() => dispatch(adFriend(donation?.creatorId, {userId: user_me?.user._id}))}>
                Dodaj prijatelja
                </Button>

                  
                  <Button variant="outlined" className={classes.send} onClick={makeConversation}>
                  Posalji poruku
                  </Button>
                  </Grid>
              )} 
            </Grid>
            
            <Grid item className={classes.grid2} lg={13} md={12} >
              <SimpleTabs currentUser={authData} currentUserId={donation?.creatorId}/>
            </Grid>
           
        </Grid>
   
    );
};

export default Profile;