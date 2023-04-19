import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "./Donations.css"
import useStyles from "./style";
import Hrana from './Hrana/Hrana';
import Odeca from './Odeca/Odeca';
import Lekovi from './Lekovi/Lekovi';
import Zdravlje from './Zdravlje/Zdravlje';
import Krv from './Krv/Krv';
import Higijena from './Higijena/Higijena';
import Briga from './Briga/Briga';
import Edukacija from './Edukacija/Edukacija';
import Novac from './Novac/Novac';
import Drugo from './Drugo/Drugo';
import Najnovije from './Najnovije/Najnovije';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  const classes = useStyles();
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




const  Categories = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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


      <TabPanel value={value} index={0}>
        <div>
          <Najnovije />
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div>
        <Hrana />
      </div>

      </TabPanel>
      <TabPanel value={value} index={2}>
        <Odeca/>
      </TabPanel>

      <TabPanel value={value} index={3}>
      <Lekovi/>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <Zdravlje  />
      </TabPanel>
      <TabPanel value={value} index={5}>
      <Krv/>
      </TabPanel>
      <TabPanel value={value} index={6}>
      <Higijena />
      </TabPanel>
      <TabPanel value={value} index={7}>
      <Briga />
      </TabPanel>
      <TabPanel value={value} index={8}>
      <Edukacija />
      </TabPanel>
      <TabPanel value={value} index={9}>
      <Novac/>
      </TabPanel>
      <TabPanel value={value} index={10}>
      <Drugo />
      </TabPanel>
    </div>
  );
}
export default Categories;