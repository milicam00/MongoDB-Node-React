import { END_LOADING_VOLUNTEERINGS, FETCH_ALL_VOLUNTEERINGS, START_LOADING_VOLUNTEERINGS } from "../constants/actionTypes";

export default (state = { isLoading: true, volunteerings: [] }, action) => {
    switch (action.type) {
      case START_LOADING_VOLUNTEERINGS:
        return { ...state, isLoading: true };

      case END_LOADING_VOLUNTEERINGS:
          return { ...state, isLoading: false };
        
      case FETCH_ALL_VOLUNTEERINGS:
        {
         
      
            return { ...state,
               volunteerings:action.payload.data
            };
          
        }
      
      default:
        return state;
    }
  };