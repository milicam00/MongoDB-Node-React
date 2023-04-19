import { FETCH_ALL_USERS_VOLUNTEERINGS, CREATE_USERS_VOLUNTEERING, UPDATE_USERS_VOLUNTEERING, DELETE_USERS_VOLUNTEERING, END_LOADING_USERS_VOLUNTEERINGS, START_LOADING_USERS_VOLUNTEERINGS } from '../constants/actionTypes';

export default (state = { isLoading: true, usersVolunteerings: [] }, action) => {
  switch (action.type) {
    case START_LOADING_USERS_VOLUNTEERINGS:
      return { ...state, isLoading: true };
    case END_LOADING_USERS_VOLUNTEERINGS:
      return { ...state, isLoading: false };
    case FETCH_ALL_USERS_VOLUNTEERINGS:
      {
        
        return { ...state, usersVolunteerings: action.payload };
      }
    case CREATE_USERS_VOLUNTEERING:
      return { ...state, usersVolunteerings: [...state.usersVolunteerings, action.payload] };
    case UPDATE_USERS_VOLUNTEERING:
     
      return { ...state, usersVolunteerings: state.usersVolunteerings.map((users_volunteering) => (users_volunteering._id === action.payload._id ? action.payload : users_volunteering)) };
    case DELETE_USERS_VOLUNTEERING:
     
      return { ...state, usersVolunteerings: state.usersVolunteerings.filter((users_volunteerings) => users_volunteerings._id !== action.payload) };
    default:
      return state;
  }
};