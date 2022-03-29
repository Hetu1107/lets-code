import React from "react";
import { Link, useNavigate } from "react-router-dom";

function RoomCard(props) {
  const navigate = useNavigate();
  if(props.data!=null){
    return (
    <div className="main-room-card" key={`user-room-${props.index}`}>
        <div className="left">
          <h2>{props.data.roomname}</h2>
          <h4>Owner : {props.data.owner}</h4>
        </div>
      </div>
    );
  }
}

export default RoomCard;
