import axios from "axios";
import React, { useState,useEffect,useContext } from "react";
import { LoaderContext } from "../context/LoaderContext";
import "../style/Friends.scss";
import Invite from "./Friends/Invite";
import UserFriends from "./Friends/UserFriends";
function Friends(props) {
  const [total_Users,set_Total_Users] = useState(null);
  const [sended,set_Sended] = useState(null);
  const [friends,set_Friends] = useState(null);
  const [user_Rooms,set_User_Rooms] = useState(null);
  const setLoad = useContext(LoaderContext);
  useEffect(()=>{
    setLoad(1);
    const getUsers = async ()=>{
      const id = localStorage.getItem("id");
      try{
        await axios.get(`/api/v1/user/getall/${id}`).then((res)=>{
          return res.data;
        }).then((data)=>{
          set_Total_Users(data.all);
        })
      }catch(e){
        console.log(e);
      }
    }
    setLoad(1);
    const getFriends = async ()=>{
      const id = localStorage.getItem("id");
      try{
        await axios.get(`/api/v1/friends/getfriends/${id}`).then((res)=>{
          return res.data;
        }).then((data)=>{
          console.log(data.friends);
          set_Sended(data.sended);
          set_Friends(data.friends);
          set_User_Rooms(data.user_rooms);
          setLoad(0);
        })
      }catch(e){
        console.log(e);
        setLoad(0);
      }
    }
    getUsers();
    getFriends();
  },[])
  return (
    <div className="main-friend-page">
     {total_Users && <Invite total_Users={total_Users}/>}
     {friends && <UserFriends sended={sended} friends={friends} user_Rooms={user_Rooms}/>}
    </div>
  );
}

export default Friends;
