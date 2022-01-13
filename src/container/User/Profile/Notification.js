import React, { useState } from "react";
const Notifications = [
  {
    text: "Hey Hetu How are you",
  },
];
function Notification() {
  const [removedNoti, setRemovedNoti] = useState(0);
  const [Notifi, setNotifi] = useState(Notifications);
  function emptyOrNotNoti() {
    if (Notifi.length == 0) {
      return (
        <div className="empty">
          <h3>Nothing is here..</h3>
        </div>
      );
    }
  }
  return (
    <div className="main-profile-right">
      <div className="main-profile-head">
        <h2>Notifications</h2>
      </div>
      <div className="main-profile-bot">
        {emptyOrNotNoti()}
        {Notifi.map((res, index) => {
          return (
            <div className="main-bot-box">
              <div className="left noti">
                <h4>{res.text}</h4>
              </div>
              <div className="right not">
                <i
                  class="fas fa-times"
                  onClick={(e) => {
                    let a = Notifi;
                    a.splice(index - removedNoti, 1);
                    setRemovedNoti(removedNoti + 1);
                    setNotifi(a);
                  }}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Notification;
