import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CardDonation from './cardDonation';
import "./Donations.css"
import { useDispatch } from "react-redux"
import { getDonationsByCategory } from '../../../actions/donations';
import {useLocation,Navigate} from "react-router-dom";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


const Donations = () => {
 
  
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const user = JSON.parse(localStorage.getItem("profile"));
 
 
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
 

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="NAJNOVIJE" {...a11yProps(0)} />
          <Tab label="HRANA" {...a11yProps(1)} />
          <Tab label="ODECA" {...a11yProps(2)} />
          <Tab label="LEKOVI" {...a11yProps(3)} />
          <Tab label="ZDRAVLJE" {...a11yProps(4)} />
          <Tab label="KRV" {...a11yProps(5)}/>
          <Tab label="HIGIJENA" {...a11yProps(6)} />
          <Tab label="BRIGA" {...a11yProps(7)} />
          <Tab label="EDUKACIJA" {...a11yProps(8)} />
          <Tab label="NOVAC" {...a11yProps(9)} />
          <Tab label="DRUGO" {...a11yProps(10)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={1}>
        <div>
        <CardDonation />
        </div>

      </TabPanel>
      <TabPanel value={value} index={2}>
        <CardDonation/>
      </TabPanel>

      <TabPanel value={value} index={3}>
      <CardDonation/>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <CardDonation  />
      </TabPanel>
      <TabPanel value={value} index={5}>
      <CardDonation/>
      </TabPanel>
      <TabPanel value={value} index={6}>
      <CardDonation />
      </TabPanel>
      <TabPanel value={value} index={7}>
      <CardDonation />
      </TabPanel>
      <TabPanel value={value} index={8}>
      <CardDonation />
      </TabPanel>
      <TabPanel value={value} index={9}>
      <CardDonation/>
      </TabPanel>
      <TabPanel value={value} index={10}>
      <CardDonation />
      </TabPanel>
    </div>
  );
}

export default Donations;