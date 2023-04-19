import express from "express";
const router = express.Router();

import Conversation from '../Models/Conversation.js';
import User from '../Models/User.js';

//Create new conversation:
//Korisnike koje zelimo da budu deo razgovora dodajemo preko id-ja koji saljemo preko body-ja:
export const createConversation = async (req, res) => {
    try {
    //Kreiramo razgovor izmedju dve osobe:

        //Za slucaj da nesto nismo prosledili?
        if(!req.body.senderId || !req.body.receiverId)
            return res.status(404).json('One or more users are not sent!');

        //Inace proveravamo da li su validni id-jevi korisnika:
        const user1 = await User.findById(req.body.senderId);
        const user2 = await User.findById(req.body.receiverId);

        //Ako barem jedan nije pronadjen:
        if(!user1 || !user2)
            return res.status(404).json('One or more users are not found in database!');

        const testArr = await Conversation.find({members: {$in: req.body.senderId}});

        //Ukoliko ovo prodje a da ne vrati response, znaci da ne postoji takav element i 
        //da trebamo da napravimo novi:
        for(let i = 0; i < testArr.length; i++) {
            for(let j = 0; j < testArr[i].members.length; j++) {
                if(testArr[i].members[j] === req.body.receiverId)
                    return res.status(200).json(testArr[i]);
            }
        }
        
        //Inace oba korisnika postoje i ne postoji nikakva konverzacija izmedju istih, 
        //moze da se kreira konverzacija:
        const initializeConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
        });

        //Vracamo objekat conversation ukoliko je sve u redu!
        const saved = await initializeConversation.save();
        return res.status(200).json(saved);

    } catch (err) {
        return res.status(500).json(err);
    }
};

//Return all user conversations:
export const returnAllConversations = async (req, res) => {
    try {
        
        const conversation = await Conversation.find({
            members: {$in: req.params.userId}
        });

        if(!conversation)
            return res.status(404).json("Conversation not found!");
        
        return res.status(200).json({
            niz: conversation
        });

    } catch (err) {
        return res.status(500).json(err);
    }
};

//Return only one conversation by id:
export const getConversation = async (req, res) => {
    try {
        const conv = await Conversation.findById(req.params.convId);
        if(conv == null)
            return res.status(404).json("No conversation with given id!");

        return res.status(200).json(conv); 
    } catch (err) {
        return res.status(500).json(err);
    }
};

export default router;