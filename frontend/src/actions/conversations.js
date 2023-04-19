import { FETCH_ALL_CONVERSATIONS, SET_ACTIVE_CONVERSATION } from "../constants/actionTypes.js";
import * as api from '../api/index.js';


export const allConversations = (userId) => async (dispatch) => {
    try{

        //Ucitavamo podatke:
        const {data} = await api.allConversations(userId);

        //Obavestavamo da smo ucitali podatke i saljemo iste nazad na front:       //Return data:
        dispatch({type: FETCH_ALL_CONVERSATIONS, payload: data});

    } catch (error) {
        console.log(error);
    }
};


export const getConversation = (convId) => async (dispatch) => {
    try {

        //Pozivamo axios
        const {data} = await api.getConversation(convId);

        //Postavljamo kao aktivni razgovor trenutni:
        dispatch({type: SET_ACTIVE_CONVERSATION, payload: data});

    } catch (err) {
        console.log(err);
    }
};

export const createConversation = (sender, receiver) => async (dispatch) => {
    try {
 
        const body = {
            senderId: sender,
            receiverId: receiver
        }

        const {data} = await api.createConversation(body)

        //Postavljamo novokreirani razgovor kao aktivni:
        dispatch({type: SET_ACTIVE_CONVERSATION, payload: data});

    } catch (err) {
        console.log(err);
    }
}