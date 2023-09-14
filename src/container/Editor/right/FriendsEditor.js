import axios from "axios";
import React, { useState, useEffect,useContext } from "react";
import ReturnAvtars from "../../Avtars/Avtar";
import { ErrorContext } from "../../context/ErrorContext";
import { LoaderContext } from "../../context/LoaderContext";
import { UserContext } from "../../context/UserContext";
const Avtar = ReturnAvtars();
function FriendsEditor(props) {
  //geting contexts
  const {setLoad} = useContext(LoaderContext);
  const error = useContext(ErrorContext);
  const {user_Id} = useContext(UserContext);

  const [people,setPeople] = useState([]);
  useEffect(()=>{
    let a = props.people;
    a.forEach(element => {
      if(user_Id!=element._id){
        setPeople([...people,element]);
      }
    });
  },[]);

  const removePeople =async (userid,index)=>{
    setLoad(1);
    const id1 = userid
    const id2 = user_Id;
    const id = props.id;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try{
      await axios.put(`https://lets-code-backend-f27r.onrender.com/api/v1/rooms/removepeople/${id}`,{id1,id2},config).then(()=>{
        let a = people;
        a.splice(index,1);
        setPeople(a);
        props.setPeople(a);
        error("removed from room");
        setTimeout(()=>{
          error("");
        },5000);
        setLoad(0);
      }).catch((e) => {
        setLoad(0);
        error(e.response.data.error);
        setTimeout(() => {
          error("");
        }, 5000);
      });
    }catch(e){
      setLoad(0);
      error(e.response.data.error);
      setTimeout(() => {
        error("");
      }, []);
    }
  }
  return (
    <div className="right-container-editor">
      {people!=null && people.map((res, index) => {
        return (
          <div className="friend" key={`friends-list-demo-${index}`}>
            <div className="img">
              <span className="offline"></span>
              <img src={Avtar[res.profileIMG].src} />
            </div>
            <div className="name">
              <h4>{res.username}</h4>
            </div>
            <div className="remove">
              <i class="fas fa-user-times" onClick={()=>removePeople(res._id,index)}></i>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FriendsEditor;
