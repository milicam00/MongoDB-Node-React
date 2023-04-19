import { START_LOADING_DONATIONS, FETCH_ALL_DONATIONS,END_LOADING_DONATIONS,FETCH_DONATIONS_BY_SEARCH,FETCH_DONATION,DONATE_TO_DONATION,UPDATE_DONATION,DELETE_DONATION,CREATE_DONATION, FETCH_LATEST_DONATIONS } from "../constants/actionTypes";

export default (state = { isLoading: true, donations: [] }, action) => {
    switch (action.type) {
      case START_LOADING_DONATIONS:
        return { ...state, isLoading: true };
      case END_LOADING_DONATIONS:
        return { ...state, isLoading: false };
      case FETCH_ALL_DONATIONS:
        return {
          ...state,
          donations: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        };

        case FETCH_DONATIONS_BY_SEARCH:
         
        return {
          ...state,
          donations: action.payload
        };
      case FETCH_DONATION:
        return {
          ...state,
          donation: action.payload.data
        };
      case UPDATE_DONATION:
       
        return { ...state, donations: state.donations.map((donation) => (donation._id === action.payload._id ? action.payload : donation)) };
      case DELETE_DONATION:
        return {
          ...state,
          response: action.payload.data
        };
      case CREATE_DONATION:
        
        return { ...state, donations: [...state.donations, action.payload] };
      
      case FETCH_LATEST_DONATIONS:
        {
          
          return{...state,donations:action.payload.data
          };
        }


      case DONATE_TO_DONATION:
        return {
          ...state,
          response: action.payload.data
        };
   
      default:
        return state;
    }
  };
