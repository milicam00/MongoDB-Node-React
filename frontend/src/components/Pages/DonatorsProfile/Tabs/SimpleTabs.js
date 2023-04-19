import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useStyles from "./style";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import User from '../User/User';
import Donations from '../Donation/Donations';
import Volunteerings from '../Volunteering/Volunteerings';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"
import { getUserDonations} from '../../../../actions/usersDonations';
import { getUserVolunteerings} from '../../../../actions//usersVolunteerings';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



const SimpleTabs = ({currentUser, currentUserId}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
         
    console.log(currentUserId);
    if(currentUser)
    dispatch(getUserDonations(currentUserId)) ;

  },[]);

  useEffect(() => {
     
    if(currentUser)
   dispatch(getUserVolunteerings(currentUserId));
   
  }, []);


  return (
    <div className={classes.div}>
      <AppBar position="static" color="inherit" className={classes.appbar}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.tabs} style={{ backgroundColor: '#3bb19b'}} >
          <Tab className={classes.tab1} label="O meni" {...a11yProps(0)} style={{color: 'white'}} />
          <Tab label="Donacije" {...a11yProps(1)} style={{color: 'white'}}/>
          <Tab label="Volontiranja" {...a11yProps(2)} style={{color: 'white'}}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} >
        <Grid direction='row' alignItems='space-between'>
            <User currentUser={currentUser}/>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
       <Donations/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Volunteerings/>
      </TabPanel>
    </div>
  )
}
export default SimpleTabs;