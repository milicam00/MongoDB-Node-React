import { FETCH_ALL_USERS_DONATIONS, CREATE_USERS_DONATION, UPDATE_USERS_DONATION, DELETE_USERS_DONATION, END_LOADING_USERS_DONATIONS, START_LOADING_USERS_DONATIONS } from '../constants/actionTypes';

export default (state = { isLoading: true, usersDonations: [] }, action) => {
  switch (action.type) {
    case START_LOADING_USERS_DONATIONS:
      return { ...state, isLoading: true };
    case END_LOADING_USERS_DONATIONS:
      return { ...state, isLoading: false };
    case FETCH_ALL_USERS_DONATIONS:
      {
       
        return { ...state, usersDonations: action.payload };
      }
    case CREATE_USERS_DONATION:
      return { ...state, usersDonations: [...state.usersDonations, action.payload] };
    case UPDATE_USERS_DONATION:
       
      return { ...state, usersDonations: state.usersDonations.map((users_donation) => (users_donation._id === action.payload._id ? action.payload : users_donation)) };
    case DELETE_USERS_DONATION:
     
      return { ...state, usersDonations: state.usersDonations.filter((users_donations) => users_donations._id !== action.payload) };
    default:
      return state;
  }
};