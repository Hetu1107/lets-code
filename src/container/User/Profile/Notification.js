import axios from "axios";
import React, { useState,useContext } from "react";
import { ErrorContext } from "../../context/ErrorContext";
import { LoaderContext } from "../../context/LoaderContext";
const Notifications = [
  {
    text: "Hey Hetu How are you",
  },
];
function Notification(props) {
  let setLoad = useContext(LoaderContext);
  let error = useContext(ErrorContext);
  const [removedNoti, setRemovedNoti] = useState(0);
  const [Notifi, setNotifi] = useState(props.notifications);
  function emptyOrNotNoti() {
    if (Notifi.length == 0) {
      return (
        <div className="empty">
          <h3>Nothing is here..</h3>
        </div>
      );
    }
  }
  const removeNotification = async (index,inde)=>{
    setLoad(1);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try{
      await axios.put(`https://lets-code-backend-f27r.onrender.com/api/v1/user/notification/remove/${index}`);
      let a = [...Notifi];
      a.splice(inde,1);
      setNotifi(a);
      error("notification removed");
      setTimeout(()=>{
        error("");
      },5000)
      setLoad(0);
    }catch(e){
      error(e);
      setLoad(0);
      setTimeout(()=>{
        error("");
      },5000);
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
            <div className="main-bot-box" key={`notification-${index}`}>
              <div className="left noti">
                <h4>{res.value}</h4>
              </div>
              <div className="right not">
                <i
                  class="fas fa-times"
                  onClick={()=>removeNotification(res.index,index)}
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
