import React, { useState } from "react";
import "../style/Friends.scss";
import Invite from "./Friends/Invite";
import UserFriends from "./Friends/UserFriends";
function Friends(props) {
  return (
    <div className="main-friend-page">
      <Invite total_Users={props.total_Users}/>
      <UserFriends user_Friends={props.user_Friends}/>
    </div>
  );
}

export default Friends;
