import express from "express";
const router = express.Router();

import Message from "../Models/Message.js";

//Add message to conversation:
export const sendMessage = async (req, res) => {
    try {
        const newMessage = await new Message(req.body);
        const savedMessage = await newMessage.save();

        return res.status(200).json(savedMessage);

    } catch (err) {
        return res.status(500).json(err);
    }
};

//Get all messages from conversation by id:
export const returnAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        });

        if(!messages)
            return res.status(404).json("Conversation is not found or does not exist!");

        return res.status(200).json(messages);
        
    } catch (err) {
        return res.status(500).json(err);
    }
};


export default router;