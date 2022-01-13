import React, { useState } from "react";
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
function FriendReq() {
  const [requests, setRequests] = useState(friend_requests);
  const [removed, setRemoved] = useState(0);

  function emptyOrNot() {
    if (requests.length == 0) {
      return (
        <div className="empty">
          <h3>Nothing is here..</h3>
        </div>
      );
    }
  }
  return (
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
  );
}

export default FriendReq;
