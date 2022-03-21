import axios from "axios";
import React, { useState,useContext } from "react";
import ReturnAvtars from "../../Avtars/Avtar";
import { ErrorContext } from "../../context/ErrorContext";
import { LoaderContext } from "../../context/LoaderContext";
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

// avtars 
const Avtars = ReturnAvtars();
/* main component fxn */
function FriendReq(props) {
  // getting loader context 
  const setLoad = useContext(LoaderContext);
  // getting error context 
  const error = useContext(ErrorContext);

  // recieved requests
  const [requests, setRequests] = useState(props.recieved);
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
  const acceptRequest = async (id,index)=>{
    setLoad(1);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try{
      let id1 = localStorage.getItem("id");
      let id2 = id;
      await axios.put("/api/v1/friends/accept",{id1,id2},config);
      setLoad(0);
      error("successfully added to friends");
      setTimeout(()=>{
        error("");
      },5000);
      let a = [...requests];
      a.splice(index, 1);
      setRequests(a);
    }catch(e){
      error(e);
      setLoad(0);
      setTimeout(()=>{
        error("");
      },5000);
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
                <img src={Avtars[res.profileIMG || 0].src} />
                <h4>{res.username}</h4>
              </div>
              <div className="right">
                <i class="fas fa-user-plus" onClick={()=>acceptRequest(res._id,index)}></i>
                <i
                  class="fas fa-trash-alt"
                  id={index}

                  onClick={(e) => {
                    let a = requests;
                    a.splice(index - removed, 1);
                    setRemoved(removed + 1);
                    setRequests(a);

                  }}
                  // onClick={()=>acceptRequest(res._id,index)}
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
