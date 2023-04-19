import { CircularProgress } from "@material-ui/core";
import React, {useState, useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import Donation from "./Donation/Donation";
import Grid from '@material-ui/core/Grid';
import useStyles from "./style";


const Donations = () => {

    const classes = useStyles();
     const [currentUserId, setCurrentUserId] = useState(0);
    
   
    const  { usersDonations, isLoading } = useSelector(state => state.usersDonations);


   
     if (!usersDonations || (!usersDonations.length && !isLoading))
            return 'Korisnik nema donacija';

    return (

            isLoading ? <CircularProgress/> : (
                <Grid container className={classes.root}>
                    <Grid container item xs={12} alignItems="strech" spacing={6} >
                        {usersDonations.map((donation) =>(
                            <Grid key={donation._id} item lg={6} md={12} className={classes.grid}>
                                <Donation donation={donation} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            )
    );
}

export default Donations;