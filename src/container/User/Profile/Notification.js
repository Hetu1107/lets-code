import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { ErrorContext } from "../../context/ErrorContext";
import { LoaderContext } from "../../context/LoaderContext";
import LoaderRing from "../../useFul/Loader";
const Notifications = [
  {
    text: "Hey Hetu How are you",
  },
];
function Notification({ notifications }) {
  let { Load, setLoad } = useContext(LoaderContext);
  let error = useContext(ErrorContext);
  const [removedNoti, setRemovedNoti] = useState(0);
  const [Notifi, setNotifi] = useState(notifications);
  const [curRemoving, setCurRemoving] = useState(-1);
  const [eleLoad, setEleLoad] = useState(0);

  useEffect(() => {
    setNotifi(notifications);
  }, [notifications]);

  function emptyOrNotNoti() {
    if (Notifi.length == 0) {
      return (
        <div className="empty">
          <h3>Nothing is here..</h3>
        </div>
      );
    }
  }
  const removeNotification = async (index, inde) => {
    setCurRemoving(inde);
    setEleLoad(1);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.put(
        `https://lets-code-backend-f27r.onrender.com/api/v1/user/notification/remove/${index}`
      );
      let a = [...Notifi];
      a.splice(inde, 1);
      setNotifi(a);
      error("notification removed");
      setTimeout(() => {
        error("");
      }, 5000);
      setEleLoad(0);
    } catch (e) {
      error(e);
      setEleLoad(0);
      setTimeout(() => {
        error("");
      }, 5000);
    }
  };
  const returnMainData = () => {
    return (
      <>
        {emptyOrNotNoti()}
        {Notifi.map((res, index) => {
          return (
            <div className="main-bot-box" key={`notification-${index}`}>
              <div className="left noti">
                <h4>{res.value}</h4>
              </div>
              <div className="right not">
                {eleLoad && curRemoving == index ? (
                  <LoaderRing />
                ) : (
                  <i
                    class="fas fa-times"
                    onClick={() => removeNotification(res.index, index)}
                  ></i>
                )}
              </div>
            </div>
          );
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
    <div className="main-profile-right">
      <div className="main-profile-head">
        <h2>Notifications</h2>
      </div>
      <div className="main-profile-bot">
        {!Notifi ? returnSkeleton() : returnMainData()}
      </div>
    </div>
  );
}

export default Notification;
