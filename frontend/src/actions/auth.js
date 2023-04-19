import * as api from '../api/index.js';
import { AUTH,END_LOADING_USERS,FETCH_USERS, FETCH_USER, START_LOADING_USERS, UPDATE_USER ,DELETE_USER,FETCH_ONE_USER} from '../constants/actionTypes.js';


export const signin= (formData, navigate) => async(dispatch) => {

    try{
        const { data } = await api.signIn(formData);

        dispatch({type: AUTH, data});
       
       

       navigate("/");
    }catch(error){
        console.log(error);
    }
};


export const signup = (formData, navigate) => async(dispatch) => {    
   

    try {
        const { data } = await api.signUp(formData);
    
        dispatch({ type: AUTH, data });

        
    
        navigate("/login");
        ///router.push('/login');
      } catch (error) {
        console.log(error);
      }
};

export const updateUser = (id, user) => async(dispatch) => {
    try{

       
        const { data } = await  api.updateUser(id, user);

      
        dispatch({ type: UPDATE_USER, payload: data});

        
       
    }catch(error){
        console.log(error);
    }
};

export const getUser = (id) => async (dispatch) => {
    try{
        dispatch({ type: START_LOADING_USERS });

       

        const { data } = await api.fetchUser(id);

       
        dispatch({type: FETCH_USER, payload: {user: data}});
        dispatch({type: END_LOADING_USERS});
        
    }catch(error){
        console.log(error);
    }
};

export const getOneUser = (id) => async (dispatch) => {
  try{
    
    const { data } = await api.fetchUser(id);

    dispatch({type: FETCH_ONE_USER, payload: data});
    
}catch(error){
    console.log(error);
}
}

export const getUsers = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_USERS });
      const { data } = await api.fetchUsers();
  
     

      const res = dispatch({ type: FETCH_USERS, payload:  data  });

     

      dispatch({ type: END_LOADING_USERS });

    } catch (error) {
      console.log(error);
    }
  };

export const deleteUser = (id, user) => async (dispatch) => {
    try {
      
      await api.deleteUser(id, user);
  
      dispatch({ type: DELETE_USER, payload: id });

    } catch (error) {
      console.log(error);
    }
  };
  
  export const adFriend = (id, currentId) => async (dispatch) => {
    try {
     

      const { data } = await api.adFriend(id, currentId);
  
      

      dispatch({ type: UPDATE_USER, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const adImage = (id, image) => async (dispatch) => {
    try {
     

      const { data } = await api.adImage(id, image);
  
     

      dispatch({ type: UPDATE_USER, payload: data });
    } catch (error) {
      console.log(error);
    }
  };