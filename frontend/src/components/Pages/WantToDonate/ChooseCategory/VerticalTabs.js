import React , {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useStyles from "./style";
import { getCategory } from "../../../../actions/category";
import { useDispatch, useSelector } from 'react-redux'; 
import Briga from '../Categories/Briga';
import Drugo from '../Categories/Drugo';
import Edukacija from '../Categories/Edukacija';
import Higijena from '../Categories/Higijena';
import Hrana from '../Categories/Hrana';
import Krv from '../Categories/Krv';
import Lekovi from '../Categories/Lekovi';
import Novac from '../Categories/Novac';
import Odeca from '../Categories/Odeca';
import Zdravlje from '../Categories/Zdravlje';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}



export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Hrana" {...a11yProps(0)} />
        <Tab label="Odeca" {...a11yProps(1)} />
        <Tab label="Lekovi" {...a11yProps(2)} />
        <Tab label="Zdravlje" {...a11yProps(3)} />
        <Tab label="Higijena" {...a11yProps(4)} />
        <Tab label="Krv" {...a11yProps(5)} />
        <Tab label="Edukacija" {...a11yProps(6)} />
        <Tab label="Briga" {...a11yProps(7)} />
        <Tab label="Novac" {...a11yProps(8)} />
        <Tab label="Drugo" {...a11yProps(9)} />
      </Tabs>
      <TabPanel value={value} index={0} >
            
        <Hrana/>
      </TabPanel>
      <TabPanel value={value} index={1} >
        
        <Odeca/>
      </TabPanel>
      <TabPanel value={value} index={2} >
        
        <Lekovi/>
      </TabPanel>
      <TabPanel value={value} index={3} >
        
        <Zdravlje/>
      </TabPanel>
      <TabPanel value={value} index={4} >
        
        <Higijena/>
      </TabPanel>
      <TabPanel value={value} index={5} >
        
        <Krv/>
      </TabPanel>
      <TabPanel value={value} index={6} >
        
        <Edukacija/>
      </TabPanel>
      <TabPanel value={value} index={7} >
        
        <Briga/>
      </TabPanel>
      <TabPanel value={value} index={8}>
        
        <Novac/>
      </TabPanel>
      <TabPanel value={value} index={9} >
        
        <Drugo/>
      </TabPanel>
    </div>
  );
}