import React from "react";
import { CircularProgress } from "@material-ui/core";
import useStyles from "./style";
import Grid from '@material-ui/core/Grid';
import { useSelector } from "react-redux";
import  User from './User/User';


const UsersList = () => {

    const classes = useStyles();
    const korisnik = JSON.parse(localStorage.getItem("profile"));
    const  { authData, isLoading } = useSelector((state) => state.auth);

   

    if (!authData || (!authData.length && !isLoading)) return 'Nema korisnika';

    return (
        isLoading ? <CircularProgress/> : (
          
            <Grid container className={classes.root}>
                <Grid container item xs={12} alignItems="strech" spacing={6} >
                    {authData.map((user) =>(
                        <Grid key={user._id} item lg={6} md={12} className={classes.grid}>
                            <User user={user} currentUserId={korisnik.user._id}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        )
    );
}

export default UsersList;