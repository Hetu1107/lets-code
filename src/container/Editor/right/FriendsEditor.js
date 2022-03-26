import React, { useState, useEffect } from "react";
import ReturnAvtars from "../../Avtars/Avtar";
const Avtar = ReturnAvtars();
function FriendsEditor() {
  const friends = [
    {
      name: "hetu",
      index: 1,
    },
    {
      name: "hetu1107",
      index: 0,
    },
  ];
  return (
    <div className="right-container-editor">
      {friends.map((res, index) => {
        return (
          <div className="friend">
            <div className="img">
              <span className="offline"></span>
              <img src={Avtar[res.index].src} />
            </div>
            <div className="name">
              <h4>{res.name}</h4>
            </div>
            <div className="remove">
              <i class="fas fa-user-times"></i>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FriendsEditor;
