import React from "react";
import { useState } from "react/cjs/react.development";
import "../style/Nav.scss";

let toggle = 0;
let drop = 0;
function Nav() {
  const [width,setwidth] = useState(window.screen.width);
  window.addEventListener('resize',()=>{
      setwidth(window.screen.width);
  })
  return (
    <nav class="top-nav">
      <div className="left-nav" id="left-nav">
          <div>
          <img src="https://cdn.iconscout.com/icon/free/png-256/notepad-2642816-2192663.png"/>
          </div>
      </div>
      <div className="right-nav" id="right-nav">
        <button
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
                console.log('jsjnf');
                if(width>700){
                  document.getElementById("sidebar").style.width = "0px";
                }
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
        </button>
        <div className="nav-search">
          <input type="text" placeholder="search here..." />
        </div>
        <div className="nev-right-right">
          <div className="nev-right-button">
            <button onClick={()=>{
              document.getElementById('modal').classList.add('modal-active');
            }}><i class="fas fa-plus"></i> create room</button>
          </div>
          <div className="nev-right-profile">
            <div className="nav-profile" onClick={()=>{
                if(drop==0){
                    document.getElementById('nav-profile-drop').style.top = "90%";
                    drop = 1;
                }
                else{
                    document.getElementById('nav-profile-drop').style.top = "-150px";
                    drop = 0;
                }
            }}>
              <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/profile-1506810-1278719.png"/>
              <h4>User</h4>
              <i class="fas fa-sort-down"></i>
            </div>
            <div className="nav-profile-drop" id="nav-profile-drop">
              <div>
                <i class="fas fa-user-alt"></i>
                <h4>Profile</h4>
              </div>
              <div>
                <i class="fas fa-sign-out-alt"></i>
                <h4>Log-Out</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
