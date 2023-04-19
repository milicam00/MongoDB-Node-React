import { START_LOADING_CATEGORIES, FETCH_ALL_CATEGORIES,END_LOADING_CATEGORIES,FETCH_CATEGORY_BY_SEARCH,FETCH_CATEGORY,CREATE_CATEGORY } from "../constants/actionTypes";

export default (state = { isLoading: true, category: [] }, action) => {
    switch (action.type) {
      case START_LOADING_CATEGORIES:
        return { ...state, isLoading: true };
      case END_LOADING_CATEGORIES:
        return { ...state, isLoading: false };
      case FETCH_ALL_CATEGORIES:
        return {
          ...state,
          donations: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        };

        case FETCH_CATEGORY_BY_SEARCH:
        
        return {
          ...state,
          donations: action.payload
        };
      case FETCH_CATEGORY:
        return {
          ...state,
          donation: action.payload.data
        };
      case CREATE_CATEGORY:
        return { 
          ...state, 
          response:action.payload.data 
       };
   
   
    
      default:
        return state;
    }
  };
