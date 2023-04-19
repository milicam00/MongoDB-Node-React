import { START_LOADING_LIKED_DONATIONS, END_LOADING_LIKED_DONATIONS,FETCH_ALL_LIKED_DONATIONS } from '../constants/actionTypes';
  
  export default (state = { isLoading: true, likedDonations: [] }, action) => {
    switch (action.type) {
      case START_LOADING_LIKED_DONATIONS:
          return { ...state, isLoading: true };
      case END_LOADING_LIKED_DONATIONS:
          return { ...state, isLoading: false };
      case FETCH_ALL_LIKED_DONATIONS:
         {
         
          return { ...state, likedDonations: action.payload };
        }
      default:
        return state;
    }
  };