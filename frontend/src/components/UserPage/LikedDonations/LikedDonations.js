import React, {useState, useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from "@material-ui/core";
import LikedDonation from './LikedDonatin/likedDonation';
import useStyles from "./style";
import { getLikedDonations } from "../../../actions/usersDonations";

const LikedDonations = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        dispatch(getLikedDonations(user.user._id));
    }, []);

    const  { likedDonations, isLoading } = useSelector(state => state.likedDonations);

   

    if (!likedDonations || (!likedDonations.length && !isLoading))
           return 'Nemate lajkovanih donacija';

    return (
        isLoading ? <CircularProgress/> : (
            
            <Grid container className={classes.root}>
                <Grid container item xs={12} alignItems="strech" spacing={6} >
                    {likedDonations.map((donation) =>(
                        <Grid key={donation._id} item lg={6} md={12} className={classes.grid}>
                            <LikedDonation donation={donation} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        )
    );


}
export default LikedDonations;