import { CREATE_CONVERSATION, FETCH_ALL_CONVERSATIONS, SET_ACTIVE_CONVERSATION } from "../constants/actionTypes";



export default (state = { isLoading: true, usersConversations: [], current: {} }, action) => {
    switch (action.type) {
      case FETCH_ALL_CONVERSATIONS:
        {
          return { ...state, usersConversations: action.payload };
        }
      case CREATE_CONVERSATION:
        return { 
            ...state,
            usersConversations: [...state.usersConversations, action.payload]
         };
      case SET_ACTIVE_CONVERSATION:
        return {
          ...state,
          current: action.payload
        };
      default:
        return state;
    }
};