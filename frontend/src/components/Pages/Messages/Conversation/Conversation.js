import './conversation.css';
import {ListItem, ListItemIcon, ListItemText, Avatar } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import { useEffect, useState, useRef } from 'react';
import { getOneUser } from '../../../../actions/auth.js';
import { allMessages } from '../../../../actions/chat.js';
import { useSelector, useDispatch } from 'react-redux';
import * as api from '../../../../api/index.js';
import { getConversation } from '../../../../actions/conversations.js';


export default function Conversation({conversation, userId}) {

  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [active, setActive] = useState(false);
  const {isLoading, usersConversations, current} = useSelector(state => state.usersConversations);

  
  useEffect(() => {
      const friendId = conversation.members.find((m) => m !== userId);
      const fun = async () => {
        const res = await api.fetchUser(friendId);
        setUser(res.data);
      }
      fun();
  }, []);

  useEffect(() => {
    if(current._id === conversation._id)
      setActive(!active);
    else
      setActive(false);
  }, [current]) 

  const setActiveConv = () => {
    const friendId = conversation.members.find((m) => m !== userId);
    dispatch(getOneUser(friendId));
    dispatch(allMessages(conversation._id));
    dispatch(getConversation(conversation._id));
  };

  return (
    <ListItem button style={{padding: "5px 5px 5px 5px", marginBottom: "0.5rem", width: "95%", maxWidth: "95%", borderRadius: "65px 65px 65px 65px", backgroundColor: "#75bca7"}} onClick={setActiveConv} >
        <ListItemIcon>
          <Avatar alt="" src={user.image ? user.image : <FaceIcon />} style={{borderRadius: "60px 60px 60px 60px / 50px 50px 50px 50px", border: "2px solid goldenrod"}} />
        </ListItemIcon>
        <ListItemText primary={user.username} />
    </ListItem>
  )
}
