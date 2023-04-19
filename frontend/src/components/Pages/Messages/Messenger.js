import { List, IconButton, TextField, Container, Box, Grid, CircularProgress, Dialog, Typography, Button} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SendIcon from '@material-ui/icons/Send';
import { useEffect, useRef } from 'react';
import Conversation from './Conversation/Conversation.js';
import './messenger.css';
import UserMessage from './UserMessage/UserMessage.js';
import { useDispatch, useSelector } from "react-redux";
import {allConversations} from '../../../actions/conversations.js';
import {allMessages, sendMessage} from '../../../actions/chat.js'
import { getConversation } from '../../../actions/conversations.js';
import { getOneUser } from '../../../actions/auth.js';
import { useState } from 'react';
import { getMessages } from '../../../api/index.js';
import {FETCH_MESSAGES_FROM_CONVERSATION} from '../../../constants/actionTypes.js'
import SendRoundedIcon from '@material-ui/icons/SendRounded';

import {io} from 'socket.io-client';

export default function Messenger() {

  
  const user_me = JSON.parse(localStorage.getItem("profile"));
  
  const dispatch = useDispatch();
  const messagesDiv = useRef(null);

  let socket;
  const [arrivalMessage, setArrivalMessage] = useState(null);
  
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketRef, setSocketRef] = useState(null);

  const {isLoading, usersConversations, current} = useSelector(state => state.usersConversations);
  const { chatMessages } = useSelector(state => state.chatMessages);
  const { isLoadnig, authData, user } = useSelector(state => state.auth); 

  
  useEffect(() => {
    setSocketRef(io(`ws://localhost:8900`));
    socketRef?.emit("addUser", user_me.user._id);
  },[]);

  
  useEffect(() => {
    socketRef?.emit("addUser", user_me.user._id);
    socketRef?.on('getMessage', data => {

      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        conversationId: data.conversationId
      })
      setMessages([...chatMessages, arrivalMessage]);
    })
  },[socketRef]);

  useEffect(() => {
  
    if(arrivalMessage && current._id === arrivalMessage.conversationId) {
      dispatch({type: FETCH_MESSAGES_FROM_CONVERSATION, payload: [...chatMessages, arrivalMessage]});
      setMessages([...chatMessages, arrivalMessage]);
      dispatch(allMessages(current._id));
      dispatch(getConversation(current._id));
    }
  }, [arrivalMessage]);

  
  const friendId = () => {
    const list = current.members;
    const f = list.filter((u) => u !== user_me.user._id);
    return f;
  }

  useEffect(() => {
    const list = current.members;
    const fr = list?.filter((u) => u !== user_me.user._id);
    fr && dispatch(getOneUser(fr));
   
    dispatch(allMessages(current._id));
    setMessages(chatMessages);
  }, []);

  
  useEffect(() => {
    dispatch(allConversations(user_me.user._id));
    dispatch(allMessages(current));
    setMessages(chatMessages);
  },[]);

  useEffect(() => {
    messagesDiv.current?.scrollIntoView({behavior: 'smooth'});
    setMessages(chatMessages);
  }, [chatMessages]);

  
  const isMine = (senderId) => {
    if(senderId === user_me.user._id)
      return true;
    return false;
  };

  
  const sendMsg = async () => {
    if(newMessage === "")
      return;

    function friendId() {
      const id = current?.members.filter((m) => m !== user_me.user._id);
      return id;
    }

    socketRef.emit("sendMessage", {
      senderId: user_me.user._id,
      receiverId: friendId(),
      text: newMessage,
      conversationId: current._id
    })

    const val = newMessage;
    dispatch(sendMessage(current._id, user_me.user._id, val));
    dispatch(getMessages(current._id));

    const newMsg = {
      conversationId: current._id,
      sender: user_me.user._id,
      message: val 
    };
    dispatch({type: FETCH_MESSAGES_FROM_CONVERSATION, payload: [...chatMessages, newMsg]});
    setMessages([...chatMessages, newMsg]);
    dispatch(allMessages(current._id));
    dispatch(getConversation(current._id));
    setNewMessage("");
    messagesDiv.current.value = "";
  }

 
  const inputRef = useRef(null);

  if(usersConversations.length == 0)
    return (
      <Grid className='loadingGrid' >
        <CircularProgress color="primary" className='loadingMessenger'
        style={{
          width: "5rem",
          height: "5rem"
        }} />
      </Grid>
    );
  return (
    <Grid className='messenger'>
      <Grid className="conversationWrapper">
        <Grid className="listWrapper">
          <List component="nav" aria-label="main mailbox folders" className="conversationsList" >
            {
              usersConversations.niz.map((c) => (
                <Conversation key={c._id} conversation={c} userId={user_me.user._id} />
              ))
            }
          </List>
        </Grid>
      </Grid>
      <Grid className="chatWrapper">
        <Grid className="messageWrapper" >
          {chatMessages?.length !== 0 ? chatMessages?.map((m) => (
            <UserMessage key={m._id} mine={isMine(m.sender)} message={m} friend={user} />
          )) : <Typography>Open conversation to view messages!</Typography>}
          <div ref={messagesDiv}></div>
        </Grid>
        <Grid className="inputWrapper">
          <TextField id="outlined-basic" label="Nova poruka:" variant="outlined" className='messageInput' size="small" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <Button variant="contained" size="large" style={{backgroundColor: "#118A7E", color: "white"}} className="sendButton" onClick={(e) => {
                e.preventDefault(); 
                sendMsg();
                setNewMessage("");
              }}><SendRoundedIcon />
            </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
