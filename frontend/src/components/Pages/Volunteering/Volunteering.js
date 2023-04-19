import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import "./Volunteering.css";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import { createVolunteering } from "../../../actions/volunteering";
import { Typography } from "@material-ui/core";

const Volunteering=()=> {

  const user=JSON.parse(localStorage.getItem('profile'));
  
  
 

  const[newVolunteeringData,setNewVolunteeringData]=useState({creatorId: user?.user._id, users: [],header: '',time: new Date(),place: '',address: '',category: []});
  const dispatch=useDispatch();

  const clear =() =>{
    setNewVolunteeringData({creatorId: user?.user._id, users: [],header: '',time: new Date(),place: '',address: '',category: []});
  }
  
  const handleSubmit=async (e) =>{
    e.preventDefault();
    dispatch(createVolunteering(newVolunteeringData));
    clear();
    
  }
  if(!user?.user){
    return (
      <div className='glavni' style={{backgroundColor: '#FEF7DC'}}>
        <Typography variant="h3" component="h2">
            Morate biti ulogovani da biste se prijavili za volontiranje
        </Typography>
        </div>
    );
}

    return (
      <div  style={{backgroundColor: '#FEF7DC'}} className='glavni'>
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <div className="forma">
              <h2 className='h2'><TextField  id="standard-basic" variant="outlined" label="Ime i prezime" fullWidth margin="dense" /></h2>
              <h2 className='h2'><TextField id="standard-basic" variant="outlined" label="Adresa" fullWidth margin="dense" value={newVolunteeringData.address} onChange={(e)=>setNewVolunteeringData({...newVolunteeringData,address:e.target.value})}  /></h2>
              <h2 className='h2'><TextField id="standard-basic" variant="outlined" label="Mesto" fullWidth margin="dense" value={newVolunteeringData.place} onChange={(e)=>setNewVolunteeringData({...newVolunteeringData,place:e.target.value})}  /></h2>
              <h2 className='h2'><TextField id="standard-basic" variant="outlined" label="Broj telefona" fullWidth margin="dense"/></h2>
              <h2 className='h2'><FormControl component="fieldset">
              </FormControl>
              </h2>
              
             

              <h2 className='h2'><FormControl component="fieldset">
              </FormControl>
              </h2>
              <FormLabel>Kratak opis</FormLabel>
              <h2><TextField id="outlined-basic"  variant="outlined" fullWidth value={newVolunteeringData.header} onChange={(e)=>setNewVolunteeringData({...newVolunteeringData,header: e.target.value})}/></h2>
              <h2 className='h2'><FormControl component="fieldset">
              </FormControl>
              </h2>
              <h2><Button style={{ backgroundColor: '#FEF7DC'}} className="dugme" variant="contained" fullWidth color="white" href="#contained-buttons" onClick={handleSubmit}>ZELIM DA VOLONTIRAM </Button></h2>
               
          </div>
          
        </Container>
       
      </React.Fragment>
      </div>
    );
}
export default Volunteering;


const categories = [
  { title: 'Novac' },
  { title: 'Hrana'},
  { title: 'Odeca' },
  { title: 'Lekovi' },
  { title: 'Zdravlje' },
  { title: 'Higijena' },
  { title: 'Krv'},
  { title: 'Edukacija' },
  { title: 'Briga' },
  { title: 'Drugo' },
 

];