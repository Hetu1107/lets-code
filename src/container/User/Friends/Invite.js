import axios from "axios";
import React,{useState,useEffect,useContext} from "react";
import ReturnAvtars from "../../Avtars/Avtar";
import { ErrorContext } from "../../context/ErrorContext";
import { LoaderContext } from "../../context/LoaderContext";
let Avtars = ReturnAvtars();
function Invite(props) {
  const setLoad = useContext(LoaderContext);
  const error = useContext(ErrorContext);
  const [total_Users,setTotalUser] = useState(props.total_Users);
  const [friends,setFriends] = useState(props.friends);
  const [sended,setSended] = useState(props.sended);
  useEffect(()=>{},[total_Users]);
  const sendFriendReq = ()=>{

  }
  const [filter,setFilter] = useState(total_Users);
  const return_Filters = ()=>{
    if(filter.length == 0){
      return(
        <div className="empty">
        <h3>Nothing is here..</h3>
      </div>
      );
    }
  }
  const sendRequest = async (id)=>{
    setLoad(1);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try{
      let id1 = id;
      let id2 = localStorage.getItem("id");
      await axios.put("/api/v1/friends/send",{id1,id2},config);
      await axios.put(`/api/v1/user/notification/add/${id1}`,{value :  `new friend request recieved` },config);
      setLoad(0);
      error("request successfully sended");
      setTimeout(()=>{
        error("");
      },5000);
      document.getElementById(id1).classList.remove("fa-user-plus");
      document.getElementById(id1).classList.add("fa-hourglass-half");
      document.getElementById(id).removeAttribute('id');
    }catch(e){
      error(e.response.data.error);
      setTimeout(()=>{
        error("");
      },5000);
      setLoad(0);
    }
  }
  const checkingFlag = (e,index_id)=>{
    if(e==2){
      return <i class="fas fa-hourglass-half" onClick={()=>{
        error("already sended request");
        setTimeout(()=>{
          error("");
        },5000)
      }}></i>
    }
    else if(e==1){
      return <i class="fas fa-check-square" onClick={()=>{
        error("already your friend");
        setTimeout(()=>{
          error("");
        },5000)
      }}></i>
    }
    else{
      return <i className="fas fa-user-plus" id={index_id} onClick={(e)=>sendRequest(index_id)}></i>
    }
  }
  return (
    <div className="invite-friends">
      <div className="invite-type">
        <h2>Invite Friends</h2>
        <input type="text" onChange={(e)=>{
            const a = [];
            for(let i=0;i<total_Users.length;i++){
              if(total_Users[i].username.includes(e.target.value.trim()) && e.target.value.trim() != ''){
                a.push(total_Users[i]);
              }
            }
            setFilter(a);
        }}/>
      </div>
      <div className="invite-result">
        <h2>Results</h2>
        <div className="search-results">
          {   
              return_Filters()
          }
          {
            filter.map((res,index)=>{
              let flag = 0;
              {friends.forEach(re => {
                  if(res._id === re._id){
                    flag = 1;
                  }
              })}  
              if(flag!=1){
                sended.forEach(re=>{
                  if(re === res._id){
                    flag = 2;
                  }
                });           
              }
              return(
                <div className="main-bot-box">
                  <div className="left">
                    <img src={Avtars[res.profileIMG || 0].src}/>
                    <h4>{res.username}</h4>
                  </div>
                  <div className="right">
                    {
                      checkingFlag(flag,res._id)
                    }
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Invite;
