import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { ErrorContext } from "../context/ErrorContext";
import { LoaderContext } from "../context/LoaderContext";
import "../style/Friends.scss";
import Invite from "./Friends/Invite";
import UserFriends from "./Friends/UserFriends";
function Friends(props) {
  const error = useContext(ErrorContext);
  const [total_Users, set_Total_Users] = useState(null);
  const [sended, set_Sended] = useState(null);
  const [friends, set_Friends] = useState(null);
  const [user_Rooms, set_User_Rooms] = useState(null);
  const { setLoad } = useContext(LoaderContext);
  useEffect(async () => {
    setLoad(1);
    const getUsers = async () => {
      const id = localStorage.getItem("id");
      try {
        await axios
          .get(
            `https://lets-code-backend-f27r.onrender.com/api/v1/user/getall/${id}`
          )
          .then((res) => {
            return res.data;
          })
          .then((data) => {
            set_Total_Users(data.all);
          });
      } catch (e) {
        error(e.response.data.error);
        setTimeout(() => {
          error("");
        }, 5000);
      }
    };
    setLoad(1);
    const getFriends = async () => {
      const id = localStorage.getItem("id");
      try {
        await axios
          .get(
            `https://lets-code-backend-f27r.onrender.com/api/v1/friends/getfriends/${id}`
          )
          .then((res) => {
            return res.data;
          })
          .then((data) => {
            setLoad(0);
            set_Sended(data.sended);
            set_Friends(data.friends);
            set_User_Rooms(data.rooms);
          })
          .catch((e) => {
            setLoad(0);
            error(e.response.data.error);
            setTimeout(() => {
              error("");
            }, 5000);
          });
      } catch (e) {
        // console.log(e);
        // error(e.response.data.error);
        setTimeout(() => {
          error("");
        }, 5000);
      }
    };
    await getUsers();
    await getFriends();
    // setLoad(0);
  }, []);
  return (
    <div className="main-friend-page">
      <Invite
        total_Users_p={total_Users}
        friends_p={friends}
        sended_p={sended}
      />
      <UserFriends sended={sended} friends={friends} user_Rooms={user_Rooms} />
    </div>
  );
}

export default Friends;
