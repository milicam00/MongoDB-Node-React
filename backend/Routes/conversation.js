import express from "express";
const router = express.Router();

import { createConversation, returnAllConversations, getConversation } from "../Controllers/conversation.js";

//Napravi novu konverzaciju:
router.post('/', createConversation);

//Vrati sve moje konverzacije:
router.get('/:userId', returnAllConversations);

//Vrati jednu konverzaciju po id-ju:
router.get('/find/:convId', getConversation);

export default router;