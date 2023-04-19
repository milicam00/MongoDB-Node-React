import { START_LOADING_CATEGORIES,END_LOADING_CATEGORIES,FETCH_CATEGORY_BY_SEARCH} from "../constants/actionTypes";
import * as api from '../api/index.js';

export const getCategory= (category) => async (dispatch) =>{
    try{
        dispatch({type: START_LOADING_CATEGORIES});

      

        const { data } = await api.fetchCategory(category);

       

        dispatch({ type: FETCH_CATEGORY_BY_SEARCH, payload: data });

       
        dispatch({ type: END_LOADING_CATEGORIES });
    }catch(error) {
        console.log(error);
    }
};