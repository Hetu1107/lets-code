import React from "react";
import { useNavigate } from "react-router-dom";

function RoomCard(props) {
  const navigate = useNavigate();
  return (
    <div className="main-room-card" key={`user-room-${props.index}`} onClick={()=>navigate("/user/rooms/1234")}>
      <div className="left">
        <h2>{props.data.name}</h2>
        <h4>Owner : {props.data.owner}</h4>
      </div>
    </div>
  );
}

export default RoomCard;
