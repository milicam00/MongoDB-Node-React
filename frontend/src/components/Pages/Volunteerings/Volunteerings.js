import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllVolunteerings } from "../../../actions/volunteering";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import Post from './Post/Post';
import Grid from '@material-ui/core/Grid';
import useStyles from "./style";





const Volunteerings=()=> {

    const classes = useStyles();
    const dispatch = useDispatch();   
    useEffect(()=>{
        dispatch(getAllVolunteerings());
    },[]);
    const {volunteerings,isLoading}=useSelector(state=>state.volunteerings);
   

    return(
     
        isLoading ? 
        (<CircularProgress/>) : (
          <Grid container className={classes.root}>
          <Grid container item xs={12} alignItems="strech" spacing={6} >
              {volunteerings.map((volunteering) =>(
                  <Grid key={volunteering._id} item lg={6} md={12} className={classes.grid} >
                      <Post volunteering={volunteering} />
                  </Grid>
              ))}
          </Grid>
      </Grid>
        )
    );
}

export default Volunteerings;

