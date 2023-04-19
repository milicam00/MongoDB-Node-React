import "./usermessage.css";
import { Grid, Avatar, Typography } from "@material-ui/core";
import { MicNoneOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
// import { getOneUser } from '../../../../actions/auth.js'
import { useEffect } from "react";
import { getUser } from "../../../../actions/auth";

export default function UserMessage({ mine, message, friend }) {

  const dispatch = useDispatch();

  const user_me = JSON.parse(localStorage.getItem("profile"));

  const { isLoadnig, authData, user } = useSelector(state => state.auth); 

  return (
    <Grid className={`userMessage ${mine ? "mineMessage" : "friendMessage"}`}>
      <Grid className="messageText" style={{wordWrap: ""}}>{message.message}</Grid>
      <Grid className="userContainer">
        <Avatar variant="square" className="chatUserImg" alt="" src={mine ? user_me.user.image : friend.image} style={{borderRadius: "60px 60px 60px 60px / 50px 50px 50px 50px"}}/>
        <Typography className="chatUsername" variant="h6" component="h6" style={{fontSize: "10px"}}>
          {mine ? "You" : friend.username}
        </Typography>
      </Grid>
    </Grid>
  );
}
