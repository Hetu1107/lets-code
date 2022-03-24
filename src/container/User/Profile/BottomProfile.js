import axios from "axios";
import React,{useEffect,useContext,useState} from "react";
import { ErrorContext } from "../../context/ErrorContext";
import { LoaderContext } from "../../context/LoaderContext";
import { UserContext } from "../../context/UserContext";
import FriendReq from "./FriendReq";
import Notification from "./Notification";

function BottomProfile() {
  const {user_Name} = useContext(UserContext);
  // Loder context 
  const setLoad = useContext(LoaderContext);

  // getting error context value 
  const error = useContext(ErrorContext);
  // all sended request data 
  const [recieved,setRecieved] = useState(null);
  // all notifications data 
  const [notifications,setNotifications]=useState(null);
  useEffect(async()=>{
    setLoad(1);
    try{
      await axios.get(`/api/v1/friends/recieved/${localStorage.getItem("id")}`).then((res)=>{
        return res.data
      }).then((data)=>{
        setNotifications(data.notifications);
        setRecieved(data.recieved);
        setLoad(0);
      })
      console.log(recieved)
    }catch(e){
      error(e.response.data.error);
      setLoad(0);
      setTimeout(()=>{
        error("");
      },5000)
    }
  },[user_Name]);
  return (
    <div className="main-profile-bottom">
      {recieved && <FriendReq recieved={recieved}/>}
      {notifications && <Notification notifications={notifications}/>}
    </div>
  );
}

export default BottomProfile;
