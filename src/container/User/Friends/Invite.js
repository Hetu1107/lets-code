import axios from "axios";
import React,{useState,useEffect,useContext} from "react";
import ReturnAvtars from "../../Avtars/Avtar";
import { LoaderContext } from "../../context/LoaderContext";
let Avtars = ReturnAvtars();
function Invite(props) {
  const [total_Users,setTotalUser] = useState(props.total_Users);
  const sendFriendReq = ()=>{

  }
  const [filter,setFilter] = useState([]);
  const return_Filters = ()=>{
    if(filter.length == 0){
      return(
        <div className="empty">
        <h3>Nothing is here..</h3>
      </div>
      );
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
              return(
                <div className="main-bot-box">
                  <div className="left">
                    <img src={Avtars[res.profileIMG || 0].src}/>
                    <h4>{res.username}</h4>
                  </div>
                  <div className="right">
                    <i class="fas fa-user-plus" id="send-req"></i>
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
