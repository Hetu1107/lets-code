import React from "react";
import { useState } from "react/cjs/react.development";
import "../style/Profile.scss";

const friend_requests = [
  {
    name: "Hetu",
    id: 0,
    avtar:
      "https://mymobotips.com/wp-content/uploads/2016/05/Make-Your-Own-Avatar_thumb.jpg",
  },
  {
    name: "Priya",
    id: 1,
    avtar:
      "https://mymobotips.com/wp-content/uploads/2016/05/Make-Your-Own-Avatar_thumb.jpg",
  },
];
const Notifications = [
    {
        text : 'Hey Hetu How are you'
    }
]
function Profile() {
  const [requests, setRequests] = useState(friend_requests);
  const [removed, setRemoved] = useState(0);
  const [removedNoti,setRemovedNoti] = useState(0);
  const [Notifi,setNotifi] = useState(Notifications);
  function emptyOrNot() {
    if (requests.length == 0) {
      return (
        <div className="empty">
          <h3>Nothing is here..</h3>
        </div>
      );
    }
  }
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
    <div className="main-profile-page">
      <div className="main-profile-top">
        <div className="main-profile-avtar">
          <div className="main-profile-avtar-frame">
            <img src="https://cdn4.vectorstock.com/i/thumb-large/77/83/cute-young-man-with-glasses-avatar-cartoon-style-vector-36327783.jpg" />
            <div className="dot"></div>
          </div>
        </div>
        <div className="main-profile-detail">
          <div className="details">
            <h3>Name</h3>
            <input />
          </div>
          <div className="details">
            <h3>Email</h3>
            <input />
          </div>
          <div className="details-button">
            <button>Edit</button>
            <button
              onClick={() => {
                document
                  .getElementById("modal-code")
                  .classList.add("modal-active");
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="main-profile-bottom">
        <div className="main-profile-left">
          <div className="main-profile-head">
            <h2>Requests</h2>
          </div>
          <div className="main-profile-bot">
            {emptyOrNot()}
            {requests.map((res, index) => {
              return (
                <div className="main-bot-box" id={`main-bot-box-${index}`}>
                  <div className="left">
                    <img src={res.avtar} />
                    <h4>{res.name}</h4>
                  </div>
                  <div className="right">
                    <i class="fas fa-user-plus"></i>
                    <i
                      class="fas fa-trash-alt"
                      id={index}
                      onClick={(e) => {
                        let a = requests;
                        a.splice(index - removed, 1);
                        setRemoved(removed + 1);
                        setRequests(a);
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
      </div>
    </div>
  );
}

export default Profile;
