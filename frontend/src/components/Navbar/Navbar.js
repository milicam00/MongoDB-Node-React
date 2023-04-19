import React, {useState} from "react";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css'
import { useNavigate } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    const navigate=useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    function logout(){
            localStorage.clear();
            navigate.push("/login");
            setUser(null);

    }

    return (
        <>
       
            <div className="navbar">
                <Link to="#" className = 'menu-bars'>
                    <MenuIcon onClick={showSidebar}/>
                </Link>
                <Link to="/login">
                    <button className="logIn">
                      Prijavi se
                     </button>
                </Link>

                <Link to="/login">
                    <button className="logIn" onClick={logout}>
                      Odjavi se
                     </button>
                </Link>



                <Link to="/userpage">
                    <button className="UserPage">
                    UserPage
                     </button>
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to="#" className='menu-bars'>
                            <CloseIcon />
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
    )
}

export default Navbar