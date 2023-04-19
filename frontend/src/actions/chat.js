import { FETCH_MESSAGES_FROM_CONVERSATION } from "../constants/actionTypes";
import * as api from '../api/index.js';

//Vraca sve objekte poruka koje su sadrzane u nekom objektu conversation:
export const allMessages = (conversationId) => async (dispatch) => {
    try{

        //Ucitavamo podatke:
        const {data} = await api.getMessages(conversationId);

        //Obavestavamo da smo ucitali podatke i saljemo iste nazad na front:       //Return data:
        dispatch({type: FETCH_MESSAGES_FROM_CONVERSATION, payload: data});

    } catch (error) {
        console.log(error);
    }
};

//Salje novu poruku:
export const sendMessage = (convId, senderId, messageData) => async (dispatch) => {
    try {

        //Pravimo body koji se salje:
        const newData = {
            conversationId : convId,
            sender: senderId,
            message : messageData
        }

        const {res} = await api.sendMessage(newData);
        //Ovo je falilo, ne pipaj za zivu glavu!
        const {data} = await api.getMessages(convId);

        //Nema potrebe nista da cuvamo, svakako ce da se osvezi sadrzaj:
        dispatch({type: FETCH_MESSAGES_FROM_CONVERSATION, payload: data});

    } catch (err) {
        console.log(err);
    }
};