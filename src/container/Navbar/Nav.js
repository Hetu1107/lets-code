import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReturnAvtars from "../Avtars/Avtar";
import { UserContext } from "../context/UserContext";
import "../style/Nav.scss";

// icons
import { BiUser } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { AiFillCaretDown } from "react-icons/ai";

let toggle = 0;
let drop = 0;
let Avtars = ReturnAvtars();
function Nav(props) {
  const navigate = useNavigate();
  let profile =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png";
  const [width, setwidth] = useState(window.screen.width);
  const { user_Name, user_Index, set_User_Index, set_User_Name } =
    useContext(UserContext);
  window.addEventListener("resize", () => {
    setwidth(window.screen.width);
  });

  const profileRed = () => {
    navigate("/user");
    document.getElementById("nav-profile-drop").style.top = "-150px";
    drop = 0;
  };
  const logOut = () => {
    localStorage.clear();
    navigate("/");
    document.getElementById("nav-profile-drop").style.top = "-150px";
    set_User_Index(null);
    set_User_Name("Login");
    drop = 0;
  };
  return (
    <nav class="top-nav">
      <div className="left-nav" id="left-nav">
        <div>
          <img src="https://cdn.iconscout.com/icon/free/png-256/notepad-2642816-2192663.png" />
        </div>
      </div>
      <div className="right-nav" id="right-nav">
        {/* <button
          id="nav-toggle"
          className="nav-toggle"
          onClick={() => {
            if (toggle == 0) {
              if(width<=1000){
                // document.getElementById("right-nav").style.width =
                // "calc(100%)";
                document.getElementById("main-home-page").style.width =
                "100vw";
                document.getElementById("sidebar").style.width = "170px";
              }
              else{
              document.getElementById("left-nav").style.width = "170px";
              document.getElementById("left-nav").style.justifyContent = "center";
              document.getElementById("right-nav").style.width =
                "calc(100% - 170px)";
              document.getElementById("sidebar").style.width = "170px";
              document.getElementById("main-home-page").style.width =
                "calc(100% - 170px)";
              }
              toggle = 1;
            } else {
              if(width<=1000){
                document.getElementById("main-home-page").style.width =
                "100vw";
                document.getElementById("sidebar").style.width = "0px";
                // document.getElementById("left-nav").style.width = "70px";
              }
              else{
              document.getElementById("left-nav").style.width = "70px";
              document.getElementById("right-nav").style.width =
                "calc(100% - 70px)";
                document.getElementById("left-nav").style.justifyContent = "flex-end";
              document.getElementById("sidebar").style.width = "70px";
              document.getElementById("main-home-page").style.width =
                "calc(100% - 70px)";
              }
              toggle = 0;
            }
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button> */}
        {/* <div className="nav-search">
          <input type="text" placeholder="search here..." />
        </div> */}
        <div className="nev-right-right">
          {/* <div className="nev-right-button">
            <button onClick={()=>{
              document.getElementById('modal').classList.add('modal-active');
            }}><i class="fas fa-plus"></i> create room</button>
          </div> */}
          <div className="nev-right-profile">
            <div
              className="nav-profile"
              onClick={() => {
                if (drop == 0) {
                  document.getElementById("nav-profile-drop").style.top = "90%";
                  drop = 1;
                } else {
                  document.getElementById("nav-profile-drop").style.top =
                    "-150px";
                  drop = 0;
                }
              }}
            >
              <img
                src={user_Index ? Avtars[user_Index].src : profile}
                style={{ borderRadius: "50%" }}
              />
              <h4>{user_Name}</h4>
              <AiFillCaretDown />
              {/* <i class="fas fa-sort-down"></i> */}
            </div>
            <div className="nav-profile-drop" id="nav-profile-drop">
              <div onClick={profileRed}>
                <BiUser />
                <h4>Profile</h4>
              </div>
              <div
                onClick={
                  user_Index != null
                    ? logOut
                    : () => {
                        navigate("/register");
                      }
                }
              >
                <IoLogOutOutline />
                <h4>{user_Index != null ? "Log-Out" : "Log-In"}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
