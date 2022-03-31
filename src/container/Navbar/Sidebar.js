import React, { useEffect, useState,useContext } from "react";
import "../style/Nav.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ReturnAvtars from "../Avtars/Avtar";
const sidebarLi = [
  {
    name: "Home",
    icon: "fas fa-home",
    to: "/",
  },
  {
    name: "Friends",
    icon: "fas fa-user-friends",
    to: "/user/friends",
  },
  {
    name: "Rooms",
    icon: "far fa-sticky-note",
    to: "/user/rooms",
  },
  {
    name: "About",
    icon: "fas fa-snowman",
    to: "/user",
  },
  // {
  //   name: "Log-Out",
  //   icon: "fas fa-sign-out-alt",
  //   to: "/",
  // },
];
let Avtars = ReturnAvtars();
function Sidebar(props) {
  let profile = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png';
  const {user_Name,user_Index} = useContext(UserContext);
  let [active, setActive] = useState("Home");
  useEffect(() => {
    document.getElementById(active).classList.add("active");
  },[]);
  return (
    <div className="sidebar" id="sidebar">
      <Link to="/register">
        <div className="side-profile">
          <div className="profile-round">
            <img src={user_Index ? Avtars[user_Index].src : profile} />
            <div className="prof-round-bottom"></div>
          </div>
          <div className="side-prof-name">
            <h2>{user_Name}</h2>
          </div>
        </div>
      </Link>
      {sidebarLi.map((res,index) => {
        return (
          <Link to={res.to}>
            <div
              className="sidebar-li"
              id={res.name}
              key={`sidebar-item-${index}`}
              onClick={() => {
                document.getElementById(active).classList.remove("active");
                document.getElementById(res.name).classList.add("active");
                setActive(res.name);
              }}
            >
              <div className="sidebar-li-ico">
                <i class={res.icon}></i>
              </div>
              <div className="sidebar-li-h2">
                <h2>{res.name}</h2>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Sidebar;
