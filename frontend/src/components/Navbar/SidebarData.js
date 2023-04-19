import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export const SidebarData = [
    {
        title: 'O nama',
        path: '/',
        icon: <HomeIcon/>,
        cName: 'nav-text'
    },
    {
        title: 'Pretrazi donacije',
        path: '/pretrazidonacije',
        icon: <SearchIcon/>,
        cName: 'nav-text',

      
    },
    {
        title: 'Pretrazi volontiranja',
        path: '/pretrazivolontiranja',
        icon: <ContactSupportIcon/>,
        cName: 'nav-text'
    },
    {
        title: 'Zelite da donirate?',
        path: '/zelitedadonirate',
        icon: <AddCircleOutlineIcon/>,
        cName: 'nav-text'
    },
    {
        title: 'Hocete da volontirate?',
        path: '/hocetedavolontirate',
        icon: <AccessibilityNewIcon/>,
        cName: 'nav-text'
    },
   
    {
        title: 'Kontaktirajte nas',
        path: '/kontaktirajtenas',
        icon: <PhoneIcon/>,
        cName: 'nav-text'
    }
];