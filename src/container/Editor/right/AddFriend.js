import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import ReturnAvtars from "../../Avtars/Avtar";
import { ErrorContext } from "../../context/ErrorContext";
import { LoaderContext } from "../../context/LoaderContext";
const Avtar = ReturnAvtars();
function AddFriend(props) {
  // gettting contexts
  const {setLoad} = useContext(LoaderContext);
  const error = useContext(ErrorContext);

  // friends state
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    let a = props.friends;
    let b = props.people;
    // if(a&&b){
    let final = [];
    a.forEach(one => {
      let r = 0;
        b.forEach(two => {
          if(one._id==two._id){
            r = 1;
            return;
          }
        });
        if(r==0){
          final.push(one);
        }
    });
    setFriends(final);
    // }
  }, [props.people,props.friends]);

  // adding friends to the room
  const addFriendToRoom = async (userid, index) => {
    setLoad(1);
    let id1 = userid;
    let id2 = localStorage.getItem("id");
    let id = props.id;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios
        .put(`https://lets-code-backend-f27r.onrender.com/api/v1/rooms/addpeople/${id}`, { id1, id2 }, config)
        .then(() => {
          props.setPeople([...props.people, friends[index]]);
          let a = friends;
          a.splice(index, 1);
          setFriends(a);
          error("added to the room");
          setTimeout(() => {
            error("");
          }, 5000);
          setLoad(0);
        }).catch((e) => {
          setLoad(0);
          error(e.response.data.error);
          setTimeout(() => {
            error("");
          }, 5000);
        });
        await axios.put(`https://lets-code-backend-f27r.onrender.com/api/v1/user/notification/add/${id1}`,{value :  `you are added to the new room` },config);
    } catch (e) {
      setLoad(0);
      error(e.response.data.error);
      setTimeout(() => {
        error("");
      }, []);
    }
  };
  return (
    <div className="right-container-editor">
      {friends != null &&
        friends.map((res, index) => {
          return (
            <div className="friend" key={`add-frnd-list-item-${index}`}>
              <div className="img">
                <img src={Avtar[res.profileIMG].src} />
              </div>
              <div className="name">
                <h4>{res.username}</h4>
              </div>
              <div className="add remove">
                <i
                  class="fas fa-user-plus"
                  onClick={() => addFriendToRoom(res._id, index)}
                ></i>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default AddFriend;
