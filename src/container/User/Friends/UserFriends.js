import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ReturnAvtars from "../../Avtars/Avtar";
import { UserContext } from "../../context/UserContext";
let Avtars = ReturnAvtars();
function UserFriends({ friends }) {
  const { user_Rooms } = useContext(UserContext);
  const [user_Friends, set_User_Friends] = useState(friends);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    set_User_Friends(friends);
  }, [friends]);

  const returnRooms = () => {
    if (user_Friends.length == 0) {
      return (
        <div className="empty">
          <h3>Nothing is here...</h3>
        </div>
      );
    } else {
      return user_Friends[selected].rooms.map((res, index) => {
        if (user_Rooms.filter((e) => e.roomID === res.roomID).length > 0) {
          return (
            <Link to={`/user/rooms/${res.roomID}`}>
              <div className="main-bot-box" key={`user-friends-${index}`}>
                <div className="left">
                  <h4>{res.roomname}</h4>
                </div>
                <div className="right">
                  <i class="fas fa-angle-right"></i>
                </div>
              </div>
            </Link>
          );
        }
      });
    }
  };

  const returnMainData = () => {
    return (
      <>
        {user_Friends.map((res, index) => {
          if (index == 0) {
            return (
              <div
                className="main-bot-box active"
                id={`main-bot-box-${index}`}
                key={`user-friend-${index}`}
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
                  <img src={Avtars[res.profileIMG].src} />
                  <h4>{res.username}</h4>
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
                  <img src={Avtars[res.profileIMG].src} />
                  <h4>{res.username}</h4>
                </div>
                <div className="right">
                  <i class="fas fa-angle-right"></i>
                </div>
              </div>
            );
          }
        })}
      </>
    );
  };
  const returnSkeleton = () => {
    return (
      <>
        <div
          className="main-bot-box skeleton-text"
          style={{ padding: "20px 0" }}
        ></div>
        <div
          className="main-bot-box skeleton-text"
          style={{ padding: "20px 0" }}
        ></div>
        <div
          className="main-bot-box skeleton-text"
          style={{ padding: "20px 0" }}
        ></div>
        <div
          className="main-bot-box skeleton-text"
          style={{ padding: "20px 0" }}
        ></div>
      </>
    );
  };

  return (
    <div className="main-friends">
      <div className="friends-list">
        <h2>Friends</h2>
        <div className="search-results select">
          {user_Friends == null ? returnSkeleton() : returnMainData()}
        </div>
      </div>
      <div className="friends-common">
        <h2>Common-Rooms</h2>
        {user_Friends == null ? (
          returnSkeleton()
        ) : (
          <div className="search-results select">{returnRooms()}</div>
        )}
      </div>
    </div>
  );
}

export default UserFriends;
