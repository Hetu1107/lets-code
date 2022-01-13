import React, { useEffect, useState } from "react";
import "../style/Nav.scss";
import { Link } from "react-router-dom";
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
    to: "/",
  },
  {
    name: "About",
    icon: "fas fa-snowman",
    to: "/user",
  },
  {
    name: "Log-Out",
    icon: "fas fa-sign-out-alt",
    to: "/",
  },
];
function Sidebar(props) {
  let [active, setActive] = useState("Home");
  useEffect(() => {
    document.getElementById(active).classList.add("active");
  }, []);
  return (
    <div className="sidebar" id="sidebar">
      <Link to="/register">
        <div className="side-profile">
          <div className="profile-round">
            <img src={props.user_Avtar} />
            <div className="prof-round-bottom"></div>
          </div>
          <div className="side-prof-name">
            <h2>{props.user_Name}</h2>
          </div>
        </div>
      </Link>
      {sidebarLi.map((res) => {
        return (
          <Link to={res.to}>
            <div
              className="sidebar-li"
              id={res.name}
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
