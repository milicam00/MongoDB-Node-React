import React, {useEffect, useState} from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom';
import { SidebarData } from './SidebarData';
import CloseIcon from '@material-ui/icons/Close';
import { useNavigate } from "react-router-dom";
import Button from '@material-ui/core/Button';
import useStyles from "./style";

const user_me = JSON.parse(localStorage.getItem("profile"));

export default function NavbarDrawer() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [sidebar, setSidebar] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate=useNavigate();

  const [loged, setLoged] = useState(false);

  useState(()=> {
    if(user_me?.user !== null) {
      setLoged(true);
    }
    else {
      setLoged(false);
    }
  },[user_me])

    const showSidebar = () => setSidebar(!sidebar);

    function logout(){
        localStorage.clear();
        navigate("/login");
        setUser(null);
        setAnchorEl(null);
       handleMobileMenuClose();
    }
    function profil(){
        navigate("/userpage");
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    const goToMessenger = () => {
     
      navigate('/messenger');
    }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={profil}>Moj pofil</MenuItem>
      
      <MenuItem  onClick={logout}>Odjavi se</MenuItem>
    
    </Menu>
  );



  
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {(!user)&&(
             <>
                <MenuItem>
                <Link to="/login">
                 <Button className={classes.logIn}> Prijavi se </Button>
                    </Link>
                </MenuItem>

             </>
        )}

       {(user)&&(user.user)&&(
             <>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit" onClick={goToMessenger}>
          <Badge color="secondary" >
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Poruke</p>
      </MenuItem>
     
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profil</p>
      </MenuItem>
      </>
          )}
    </Menu>
    
  );

  return (
    <>
    <div className={classes.grow} >
      <AppBar position="static" style={{backgroundColor: '#118A7E'}}>
     
        <Toolbar alij>
        <Link to="#" className = 'menu-bars'>
          <IconButton
          onClick={showSidebar}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon  style={{color: 'white'}}/>
          </IconButton>
          </Link>
        
          {(!user)&&(
             <>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
                <Link to="/login">
                 <Button className={classes.logIn}> Prijavi se </Button>
            </Link>
            </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
                </>
          )}
          {(user)&&(user.user)&&(
             <>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <IconButton aria-label="show 4 new mails" color="inherit" onClick={goToMessenger}>
                    <Badge color="secondary">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
                </>
          )}
          
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
    <ul className='nav-menu-items' onClick={showSidebar}>
        <li className='navbar-toggle'>
            <Link to="#" className='menu-bars'>
               <Button className={classes.btnClose} ><CloseIcon style={{color: 'white'}}/> </Button>
            </Link>
        </li>
        {SidebarData.map((item, index) => {
            return(
                <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            {item.icon} 
                            <span>{item.title}</span>
                        </Link>
                </li>
            )
        })}
    </ul>
</nav>
</>
    
  );
}
