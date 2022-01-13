import React, { useState } from "react";
import "../style/Friends.scss";
import Invite from "./Friends/Invite";
import UserFriends from "./Friends/UserFriends";
function Friends() {
  return (
    <div className="main-friend-page">
      <Invite />
      <UserFriends />
    </div>
  );
}

export default Friends;
