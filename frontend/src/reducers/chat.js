import { FETCH_MESSAGES_FROM_CONVERSATION, NEW_MESSAGE } from "../constants/actionTypes";

const defaultMessages = [];

export default (state = { chatMessages: [] }, action) => {
    switch (action.type) {
      case FETCH_MESSAGES_FROM_CONVERSATION:
        {
          return { ...state, chatMessages: action.payload };
        }
      case NEW_MESSAGE:
        {
          return {...state, chatMessages: action.payload}
        } 
      default:
        return state;
    }
};