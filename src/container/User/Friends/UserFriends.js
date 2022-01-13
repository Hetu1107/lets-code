import React from "react";
import { useState } from "react/cjs/react.development";

function UserFriends(props) {
  const user_Friends = props.user_Friends;
  const [selected, setSelected] = useState(0);
  return (
    <div className="main-friends">
      <div className="friends-list">
        <h2>Friends</h2>
        <div className="search-results select">
          {user_Friends.map((res, index) => {
            if (index == 0) {
              return (
                <div
                  className="main-bot-box active"
                  id={`main-bot-box-${index}`}
                  onClick={() => {
                    document
                      .getElementById(`main-bot-box-${selected}`)
                      .classList.remove("active");
                    document
                      .getElementById(`main-bot-box-${index}`)
                      .classList.add("active");
                    setSelected(index);
                  }}
                >
                  <div className="left">
                    <img src={res.src} />
                    <h4>{res.name}</h4>
                  </div>
                  <div className="right">
                    <i class="fas fa-angle-right"></i>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className="main-bot-box"
                  id={`main-bot-box-${index}`}
                  onClick={() => {
                    document
                      .getElementById(`main-bot-box-${selected}`)
                      .classList.remove("active");
                    document
                      .getElementById(`main-bot-box-${index}`)
                      .classList.add("active");
                    setSelected(index);
                  }}
                >
                  <div className="left">
                    <img src={res.src} />
                    <h4>{res.name}</h4>
                  </div>
                  <div className="right">
                    <i class="fas fa-angle-right"></i>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="friends-common">
        <h2>Common-Rooms</h2>
        <div className="search-results select">
          {user_Friends[selected].rooms.map((res, index) => {
            return(
            <div className="main-bot-box">
              <div className="left">
                <h4>{res}</h4>
              </div>
              <div className="right">
                <i class="fas fa-angle-right"></i>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserFriends;
