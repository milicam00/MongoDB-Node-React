import {useEffect, useState} from "react";
import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import "./WantToDonate.css";
import { Typography } from "@material-ui/core";
import { createDonation } from "../../../actions/donations";
import { useDispatch, useSelector } from 'react-redux';      
import { getCategory } from "../../../actions/category";  
import { CollectionsOutlined } from "@material-ui/icons";
import FileBase from 'react-file-base64';
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
  

export default function WantToDonate() {

   
    const category = useSelector((state) => state.category);
    
    const user = JSON.parse(localStorage.getItem("profile"));
    
    const [donationData, setDonationData] = useState({
        creatorId: user?.user._id,
        creatorName: "",
        header: "",
        data: "",
        isRequest: false,
        categories: "",
        city: "",
        address: "",
        contact: "",
        donators: [],
        active: true,
        image: "",
    });
  
    useEffect(() => {
       
        setDonationData({
            ...donationData,
            categories: category.donations 
            
        });
       
   }, [category.donations]);
   
    const dispatch = useDispatch();
   

    if(!user?.user){
        return (
            <Typography variant="h3" component="h2">
                Morate biti ulogovani da biste dodali donaciju
            </Typography>
        );
    }

   

    
    const clear = () => {
        setDonationData({
            creatorId: user?.user._id,
            creatorName: "",
            header: "",
            data: "",
            isRequest: false,
            categories: [],
            city: "",
            address: "",
            contact: "",
            donators: [],
            active: true,
            image: "",
        });
    };

  

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        
          dispatch(createDonation(donationData));
         
       
      };


    const handleInputChange=(event)=>{
      

       
    }


   
    
    return (
        !user?.user ?
            (
                <Typography variant="h3" component="h2">
                    Morate biti ulogovani da biste dodali donaciju
                </Typography>
            ) 
        :
         (
                
       
      
     
          <div className="forma1">
               <TextField name="creatorName" variant="outlined" id="standard-basic" label="Ime i prezime" fullWidth margin="dense" value={donationData.creatorName} onChange={(e) => setDonationData({ ...donationData, creatorName: e.target.value })} ></TextField>
              <TextField  name="email" variant="outlined" id="standard-basic" label="Email" fullWidth margin="dense"/>
             <TextField name="city" variant="outlined" id="standard-basic" label="Grad" fullWidth margin="dense" value ={donationData.city} onChange={(e) => setDonationData({ ...donationData, city: e.target.value })}/>
             <TextField name="address" variant="outlined" id="standard-basic" label="Adresa" fullWidth margin="dense" value ={donationData.address} onChange={(e) => setDonationData({ ...donationData, address: e.target.value })}/>
             <TextField name="contact" variant="outlined" id="standard-basic" label="Broj telefona" fullWidth margin="dense" value={donationData.contact} onChange={(e) => setDonationData({ ...donationData, contact: e.target.value })} />
              <TextField name="header" variant="outlined" id="standard-basic" label="Naslov donacije" fullWidth margin="dense" value={donationData.header} onChange={(e) => setDonationData({ ...donationData, header: e.target.value })}/>
              <FormControl component="fieldset">
              </FormControl>
             
              <FormControl component="fieldset">
              </FormControl>
            
              <FormLabel >Kratak opis</FormLabel>
              <h2><TextField name="data"  id="outlined-basic"  variant="outlined"  fullWidth value={donationData.data} onChange={(e) => setDonationData({ ...donationData, data: e.target.value })}/></h2>
              <h2 className='h2'><FormControl component="fieldset">
              </FormControl></h2>
              <FormLabel>Ubacite fotografiju</FormLabel>
                   
             <FileBase type="file" multiple={false} onDone={({base64})=>setDonationData({...donationData,image:base64})}/>
            
             <h2 className='h2'><FormControl component="fieldset">
              </FormControl>
             </h2>




              
              <h2><Button style={{ backgroundColor: '#FEF7DC'}} margin="dense" fullWidth className="dugme" variant="contained" color="black" href="#contained-buttons" onClick={handleSubmit}>ZELIM DA DONIRAM </Button></h2>
               
          </div>
          
      
       
     
         )
     
    
    );
}


