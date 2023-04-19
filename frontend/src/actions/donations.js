import { START_LOADING_DONATIONS,FETCH_DONATIONS_BY_SEARCH,END_LOADING_DONATIONS,CREATE_DONATION,FETCH_DONATION,FETCH_LATEST_DONATIONS,UPDATE_DONATION } from "../constants/actionTypes";
import * as api from '../api/index.js';

export const getDonationsByCategory = (category) => async (dispatch) => {
    try{
        //Pocinjemo sa ucitavanjem: //IsLoading == true
        dispatch({type: START_LOADING_DONATIONS});

       

        //Ucitavamo podatke:
        const {data} = await api.fetchDonationsByType(category);

        

        //Obavestavamo da smo ucitali podatke i saljemo iste nazad na front:       //Return data:
        dispatch({type: FETCH_DONATIONS_BY_SEARCH, payload: data});

        //Zavrsili smo sa citanjem podataka:    //IsLoading == false
        dispatch({type: END_LOADING_DONATIONS});

    } catch (error) {
        console.log(error);
    }
};

export const createDonation = (newData) => async (dispatch) => {
    try {

       
        dispatch({type: START_LOADING_DONATIONS});
       

        //Kao response dobijamo objekat nova donacija:
        const {data} = await api.createNewDonation(newData);

      

        dispatch({type: CREATE_DONATION, payload: data});
        //Sad je vracamo na front: 
        //dispatch({type: END_LOADING_DONATIONS});

    } catch (error) {
        console.log(error);
    }
};

export const donateToPost = (id, donation) => async (dispatch) => {
    try {
        

      const { data } = await api.donateToPost(id, donation);
  
    
      dispatch({ type: UPDATE_DONATION, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
export const getLatestDonations=()=>async(dispatch)=>{

    try{


        dispatch({type:START_LOADING_DONATIONS});

        const {data}=await api.fetchLatestDonations();

        dispatch({type:FETCH_LATEST_DONATIONS,payload:{data}});

        dispatch({type:END_LOADING_DONATIONS});


        
        

    }catch(error){
        console.log(error);
    }


}
