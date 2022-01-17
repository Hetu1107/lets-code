import React from "react";

function RoomCard(props) {
  return (
    <div className="main-room-card">
      <div className="left">
        <h2>{props.data.name}</h2>
        <h4>Owner : {props.data.owner}</h4>
      </div>
    </div>
  );
}

export default RoomCard;
