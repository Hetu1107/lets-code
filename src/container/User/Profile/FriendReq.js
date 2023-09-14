import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import ReturnAvtars from "../../Avtars/Avtar";
import { ErrorContext } from "../../context/ErrorContext";
import { LoaderContext } from "../../context/LoaderContext";
import LoaderRing from "../../useFul/Loader";

// avtars
const Avtars = ReturnAvtars();
/* main component fxn */
function FriendReq({ recieved }) {
  // getting loader context
  const { Load, setLoad } = useContext(LoaderContext);
  // getting error context
  const error = useContext(ErrorContext);

  // recieved requests
  const [requests, setRequests] = useState(recieved);
  const [removed, setRemoved] = useState(0);
  const [curRemoving, setCurRemoving] = useState(-1);
  const [eleLoad, setEleLoad] = useState(0);

  useEffect(() => {
    setRequests(recieved);
  }, [recieved]);
  function emptyOrNot() {
    if (requests.length == 0) {
      return (
        <div className="empty">
          <h3>Nothing is here..</h3>
        </div>
      );
    }
  }
  const acceptRequest = async (id, index) => {
    setCurRemoving(index);
    setEleLoad(1);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      let id1 = localStorage.getItem("id");
      let id2 = id;
      await axios.put(
        "https://lets-code-backend-f27r.onrender.com/api/v1/friends/accept",
        { id1, id2 },
        config
      );
      setEleLoad(0);
      error("successfully added to friends");
      setTimeout(() => {
        error("");
      }, 5000);
      let a = [...requests];
      a.splice(index, 1);
      setRequests(a);
    } catch (e) {
      error(e);
      setEleLoad(0);
      setTimeout(() => {
        error("");
      }, 5000);
    }
  };
  const removeRequest = async (id, index) => {
    setCurRemoving(index);
    setEleLoad(1);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      let id1 = localStorage.getItem("id");
      let id2 = id;
      await axios.put(
        "https://lets-code-backend-f27r.onrender.com/api/v1/friends/reject",
        { id1, id2 },
        config
      );
      await axios.put(
        `https://lets-code-backend-f27r.onrender.com/api/v1/user/notification/add/${id2}`,
        { value: `new friend added` },
        config
      );
      setEleLoad(0);
      error("removed from friend requests");
      setTimeout(() => {
        error("");
      }, 5000);
      let a = [...requests];
      a.splice(index, 1);
      setRequests(a);
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
        {emptyOrNot()}
        {requests.map((res, index) => {
          return (
            <div
              className="main-bot-box"
              id={`main-bot-box-${index}`}
              key={`requests-${index}`}
            >
              <div className="left">
                <img src={Avtars[res.profileIMG || 0].src} />
                <h4>{res.username}</h4>
              </div>
              <div className="right">
                {eleLoad && curRemoving == index ? (
                  <LoaderRing />
                ) : (
                  <>
                    <i
                      class="fas fa-user-plus"
                      onClick={() => acceptRequest(res._id, index)}
                    ></i>
                    <i
                      class="fas fa-trash-alt"
                      id={`remove-${index}`}
                      onClick={() => removeRequest(res._id, index)}
                    ></i>
                  </>
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
    <div className="main-profile-left">
      <div className="main-profile-head">
        <h2>Requests</h2>
      </div>
      <div className="main-profile-bot">
        {!requests ? returnSkeleton() : returnMainData()}
      </div>
    </div>
  );
}

export default FriendReq;
