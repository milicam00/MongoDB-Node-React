
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Pages/Home/Home'
import Contact from './components/Pages/Contact/Contact'
import Categories from './components/Pages/Donations/Categories'
import Volunteering from './components/Pages/Volunteering/Volunteering'
import WantToDonate from './components/Pages/WantToDonate/WantToDonate'
import Profile from './components/Pages/DonatorsProfile/Profile'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { Najnovije, Hrana, Novac, Odeca, Lekovi, Zdravlje, Higijena, Krv,
Edukacija, Briga, Drugo} from './components/Pages/AllDonations'
import Main from './components/Auth/Main/main';
import SignUp from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
import VerticalTabs from './components/Pages/WantToDonate/ChooseCategory/VerticalTabs';
import NavbarDrawer from './components/Navbar/NavbarDrawer';
import UserPage from "./components/UserPage/UserPage";
import Volunteerings from './components/Pages/Volunteerings/Volunteerings';
import Messenger from './components/Pages/Messages/Messenger.js';

function App() {

  const user = localStorage.getItem("token")
  return (
    <>
    <Router>
      <NavbarDrawer/>
     
       <Routes>
            <Route path='/' exact element={<Home/>}/>
           <Route path='/pretrazidonacije' element={ <Categories/>}/>
                 
           <Route path='/pretrazivolontiranja' element={<Volunteerings/>}/>
           <Route path='/zelitedadonirate' element={ <VerticalTabs/>}/>
           <Route path='/hocetedavolontirate' element={ <Volunteering/>}/>
           <Route path='/kontaktirajtenas' element={ <Contact/>}/>
           <Route path='/signup' exact element={ <SignUp/>}/>
           <Route path='/login' exact element={ <Login/>}/>
           <Route path='/' exact element={ <Navigate replace to="/login"/>}/>
           <Route path='/' exact element={() => <Navigate replace to="/userpage" />}/>
           <Route path='/userpage' exact element={<UserPage/>}/>
           <Route path='/profile' exact element={<Profile/>}/>
           <Route path='/messenger' exact element={ <Messenger /> }/>
          
       </Routes>
    </Router>
       
    </>
  );
}

export default App;
