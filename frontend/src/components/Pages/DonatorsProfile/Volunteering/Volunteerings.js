import React from "react";
import { CircularProgress } from "@material-ui/core";
import useStyles from "./style";
import Volunteering from "./Volunteering/Volunteering";
import Grid from '@material-ui/core/Grid';
import { useSelector } from "react-redux";

const Volunteerings = () => {

    const classes = useStyles();

    const  { usersVolunteerings, isLoading } = useSelector(state => state.usersVolunteerings);


    if (!usersVolunteerings || (!usersVolunteerings?.length && !isLoading))
           return 'Korisnik nema volontiranja';

    return (
        isLoading ? <CircularProgress/> : (
           
            <Grid container className={classes.root}>
                <Grid container item xs={12} alignItems="strech" spacing={6} >
                    {usersVolunteerings.map((volunteering) =>(
                        <Grid key={volunteering._id} item lg={6} md={12} className={classes.grid}>
                            <Volunteering volunteering={volunteering} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        )
    );
}

export default Volunteerings;