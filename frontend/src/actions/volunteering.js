import * as api from '../api/index.js';
import {END_LOADING_VOLUNTEERINGS, FETCH_VOLUNTEERING,FETCH_ALL_VOLUNTEERINGS, START_LOADING_VOLUNTEERINGS} from '../constants/actionTypes.js';

export const createVolunteering = (data) => async (dispatch) => {
    try {
        //Pravimo novo volontiranje: 
        const {response} = await api.createNewVolunteering(data);

        //Vracamo novo kreirano volontiranje na front:
        dispatch({type: FETCH_VOLUNTEERING, payload: response});
    } catch (error) {
        console.log(error);
    }
};


export const getAllVolunteerings=()=>async(dispatch)=>{
    try{
        dispatch({type:START_LOADING_VOLUNTEERINGS});

        const {data}=await api.fetchAllVolunteerings();

       
        dispatch({type:FETCH_ALL_VOLUNTEERINGS,payload:{data}});

      
       

        dispatch({type:END_LOADING_VOLUNTEERINGS});
      
    }
    catch(error)
    {
        console.log(error);
    }
};