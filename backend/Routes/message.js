import express from "express";
const router = express.Router();

import Message from "../Models/Message.js";
import { sendMessage, returnAllMessages } from "../Controllers/message.js";

//Posalji poruku u razgovor:
router.post('/', sendMessage);

//Vrati sve poruke iz razgovora:
router.get('/:conversationId', returnAllMessages);


export default router;
