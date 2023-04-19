import { START_LOADING_USERS_DONATIONS, FETCH_ALL_USERS_DONATIONS,END_LOADING_USERS_DONATIONS,DELETE_USERS_DONATION, UPDATE_USERS_DONATION,START_LOADING_LIKED_DONATIONS,
  FETCH_ALL_LIKED_DONATIONS,END_LOADING_LIKED_DONATIONS} from "../constants/actionTypes"
import * as api from '../api/index.js';

export const getUserDonations= (user_id) => async (dispatch) =>{
    try{
        dispatch({type: START_LOADING_USERS_DONATIONS});

       

        const { data } = await api.fetchUsersDonations(user_id);

        
       

        dispatch({ type: FETCH_ALL_USERS_DONATIONS, payload: data });

        
        dispatch({ type: END_LOADING_USERS_DONATIONS });
    }catch(error) {
        console.log(error);
    }
};


export const getLikedDonations= (user_id) => async (dispatch) =>{
  try{
      dispatch({type: START_LOADING_LIKED_DONATIONS});

     
      const { data } = await api.fetchLikedDonations(user_id);

      
     
      dispatch({ type: FETCH_ALL_LIKED_DONATIONS, payload: data });

    
      dispatch({ type: END_LOADING_LIKED_DONATIONS });
  }catch(error) {
      console.log(error);
  }
};

export const deleteUsersDonation = (id , usersDonation) => async (dispatch) => {
    try {
     

      await api.deleteUsersDonation(id, usersDonation);
  
      dispatch({ type: DELETE_USERS_DONATION, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  
export const updateUsersDonation = (id, usersDonatin) => async (dispatch) => {
  try {

    
    const { data } = await api.updateUsersDonation(id, usersDonatin);

    
    dispatch({ type: UPDATE_USERS_DONATION, payload: data });
  } catch (error) {
    console.log(error);
  }
};