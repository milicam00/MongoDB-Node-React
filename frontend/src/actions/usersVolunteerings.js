import { START_LOADING_USERS_VOLUNTEERINGS, FETCH_ALL_USERS_VOLUNTEERINGS,END_LOADING_USERS_VOLUNTEERINGS, DELETE_USERS_VOLUNTEERING, UPDATE_USERS_VOLUNTEERING } from "../constants/actionTypes"
import * as api from '../api/index.js';

export const getUserVolunteerings= (user_id) => async (dispatch) =>{
    try{
        dispatch({type: START_LOADING_USERS_VOLUNTEERINGS});

       

        const { data } = await api.fetchUsersVolunteerings(user_id);

        
       

        dispatch({ type: FETCH_ALL_USERS_VOLUNTEERINGS, payload: data });

       
        dispatch({ type: END_LOADING_USERS_VOLUNTEERINGS });
    }catch(error) {
        console.log(error);
    }
};


export const deleteUsersVolunteering = (id, userId) => async (dispatch) => {
    try {
       
      await api.deleteUsersVolunteering(id, userId);
  
      dispatch({ type: DELETE_USERS_VOLUNTEERING, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  
  export const updateUsersVolunteering = (id, userVolunteering) => async (dispatch) => {
    try {
  
     
      const { data } = await api.updateUsersVolunteering(id,userVolunteering);
  
      
      dispatch({ type: UPDATE_USERS_VOLUNTEERING, payload: data });
    } catch (error) {
      console.log(error);
    }
  };