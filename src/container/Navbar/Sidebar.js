import React from "react";
import "../style/Nav.scss";

const sidebarLi = [
  {
    name: "Home",
    icon: "fas fa-home",
  },
  {
    name : "Friends",
    icon :"fas fa-user-friends",
  },
  {
    name: "Rooms",
    icon: "far fa-sticky-note",
  },
  {
      name : "About",
      icon : "fas fa-snowman",
  },
  {
      name : "Log-Out",
      icon : "fas fa-sign-out-alt"
  },
  
];
function Sidebar() {
  return (
    <div className="sidebar" id="sidebar">
      <div className="side-profile">
        <div className="profile-round">
          <img src="https://cdn4.vectorstock.com/i/thumb-large/77/83/cute-young-man-with-glasses-avatar-cartoon-style-vector-36327783.jpg" />
          <div className="prof-round-bottom"></div>
        </div>
        <div className="side-prof-name">
          <h2>Login</h2>
        </div>
      </div>
      {sidebarLi.map((res) => {
        return (
          <div className="sidebar-li">
            <div className="sidebar-li-ico">
              <i class={res.icon}></i>
            </div>
            <div className="sidebar-li-h2">
              <h2>{res.name}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;
