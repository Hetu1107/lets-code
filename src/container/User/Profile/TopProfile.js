import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import ReturnAvtars from "../../Avtars/Avtar";
import { LoaderContext } from "../../context/LoaderContext";
import { UserContext } from "../../context/UserContext";

const Avtars = ReturnAvtars();
function TopProfile(props) {

  // loader 
  const {Load,setLoad} = useContext(LoaderContext);

  let {set_User_Index,set_User_Name,set_User_Email,user_Index,user_Name,user_Email} = useContext(UserContext);
  const [editMode, setMode] = useState(false);
  // state for updating details
  const [changeUserName, setChangeUserName] = useState();
  const [changeEmail, setChangeEmail] = useState();
  const [changeImgIndex, setChangeImgIndex] = useState();
  const [cahngeIMG,setChangeIMG] = useState(Avtars[user_Index ? user_Index : 0].src);
  useEffect(()=>{
    setChangeUserName(user_Name);
    setChangeEmail(user_Email);
    setChangeImgIndex(user_Index);
    setChangeIMG(Avtars[user_Index ? user_Index : 0].src);
  },[user_Name,user_Index,user_Email]);


  useEffect(() => {
    if (editMode == false) {
      document.getElementById("left-arrow").style.display = "none";
      document.getElementById("right-arrow").style.display = "none";
    }
  });

  // updating the user details
  const updateDetails = async () => {
    setLoad(1);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      let username = changeUserName;
      let email = changeEmail;
      let profileIMG = changeImgIndex;
      await axios.put(
        `https://lets-code-backend-f27r.onrender.com/api/v1/user/update/${localStorage.getItem("id")}`,
        { username, email, profileIMG },
        config
      );
      setLoad(0);
    } catch (e) {
    }
    setLoad(0);
  };

  // return jsx
  return (
    <div className="main-profile-top">
      <div className="main-profile-avtar">
        <div className="main-profile-avtar-frame">
          <img className="skeleton" src={Load ? "" : cahngeIMG} />
          <div className="dot"></div>
          <div className="left-arrow" id="left-arrow">
            <i class="fas fa-chevron-left" onClick={()=>{
              if (changeImgIndex == 0) {
                setChangeImgIndex(Avtars.length - 1);
                setChangeIMG(Avtars[Avtars.length - 1].src);
              } else {
                let r = changeImgIndex;
                setChangeImgIndex(r - 1);
                setChangeIMG(Avtars[r-1].src);
              }
            }}></i>
          </div>
          <div className="right-arrow" id="right-arrow">
            <i class="fas fa-chevron-right" onClick={()=>{
              if (changeImgIndex == Avtars.length - 1) {
                setChangeImgIndex(0);
                setChangeIMG(Avtars[0].src);
              } else {
                let r = changeImgIndex;
                setChangeImgIndex(r + 1);
                setChangeIMG(Avtars[r+1].src);
              }
            }}></i>
          </div>
        </div>
      </div>
      <div className="main-profile-detail">
        <div className="details" >
          <h3>Name</h3>
          <input
            className={Load ? "skeleton-text" : ""}
            value={changeUserName}
            onChange={(e) => {
              setChangeUserName(e.target.value);
            }}
            onFocus={(e) => {
              if (editMode) {
                e.target.focus();
              } else {
                e.target.blur();
              }
            }}
          />
        </div>
        <div className="details">
          <h3>Email</h3>
          <input
            className={Load ? "skeleton-text" : ""}
            value={changeEmail}
            onChange={(e) => {
              setChangeEmail(e.target.value);
            }}
            onFocus={(e) => {
              if (editMode) {
                e.target.focus();
              } else {
                e.target.blur();
              }
            }}
          />
        </div>
        <div className="details-button">
          <button
            id="edit-button"
            onClick={() => {
              if (editMode === false) {
                document.getElementById("left-arrow").style.display = "flex";
                document.getElementById("right-arrow").style.display = "flex";
                document.getElementById("edit-button").innerText = "Cancel";
                setMode(true);
              } else {
                setChangeUserName(user_Name);
                setChangeEmail(user_Email);
                setChangeImgIndex(user_Index);
                setChangeIMG(Avtars[changeImgIndex].src);
                document.getElementById("edit-button").innerText = "Edit";
                document.getElementById("left-arrow").style.display = "none";
                document.getElementById("right-arrow").style.display = "none";
                setMode(false);
              }
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              updateDetails();
              set_User_Index(changeImgIndex);
              set_User_Name(changeUserName);
              set_User_Email(changeEmail);
              setMode(false);
              document.getElementById("edit-button").innerText = "Edit";
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopProfile;
