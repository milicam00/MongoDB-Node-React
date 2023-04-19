import { AUTH, LOGOUT, DELETE_USER, FETCH_USERS, FETCH_USER, UPDATE_USER, START_LOADING_USERS, END_LOADING_USERS, FETCH_ONE_USER } from '../constants/actionTypes';

export default(state = { isLoading: true, authData: [], user: {} }, action) => {

    switch (action.type) {
        case AUTH:
          localStorage.setItem('profile', JSON.stringify({ ...action.data }));
    
          return { ...state, authData: action.payload, loading: false, errors: null };
        case LOGOUT:
          localStorage.clear();
    
          return { ...state, authData: null, loading: false, errors: null };
        case START_LOADING_USERS:
          return { ...state, isLoading: true };
        case END_LOADING_USERS:
          return { ...state, isLoading: false };
        case DELETE_USER:
         
          return { ...state, authData: state.authData.filter((user) => user._id !== action.payload) };
        case FETCH_USERS:
          
          return {
            ...state,
            authData: action.payload,
            
          };
        case FETCH_USER:
           
           
            return { ...state, authData: action.payload.user }
        case UPDATE_USER:
          {
            
           return { ...state, authData: state.authData.map((user) => (user._id === action.payload._id ? action.payload : user)) };
         
          }
        case FETCH_ONE_USER:
          {    
            return { ...state, user: action.payload }
          }
        default:
          return state;
      }
};

