import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { ErrorContext } from "../../context/ErrorContext";
import { LoaderContext } from "../../context/LoaderContext";
import { UserContext } from "../../context/UserContext";
import FriendReq from "./FriendReq";
import Notification from "./Notification";

function BottomProfile() {
  const { user_Name } = useContext(UserContext);
  // Loder context
  const { Load, setLoad } = useContext(LoaderContext);

  // getting error context value
  const error = useContext(ErrorContext);
  // all sended request data
  const [recieved, setRecieved] = useState(null);
  // all notifications data
  const [notifications, setNotifications] = useState(null);

  useEffect(async () => {
    setLoad(1);
    try {
      await axios
        .get(
          `https://lets-code-backend-f27r.onrender.com/api/v1/friends/recieved/${localStorage.getItem(
            "id"
          )}`
        )
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setNotifications(data.notifications);
          setRecieved(data.recieved);
          setLoad(0);
        })
        .catch((e) => {
          setLoad(0);
          error(e.response.data.error);
          setTimeout(() => {
            error("");
          }, 5000);
        });
    } catch (e) {
      error(e.response.data.error);
      setLoad(0);
      setTimeout(() => {
        error("");
      }, 5000);
    }
  }, [user_Name]);

  return (
    <div className="main-profile-bottom">
      <FriendReq recieved={recieved} />
      <Notification notifications={notifications} />
    </div>
  );
}

export default BottomProfile;
