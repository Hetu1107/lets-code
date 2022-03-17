import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import ReturnAvtars from "../../Avtars/Avtar";
import { LoaderContext } from "../../context/LoaderContext";
import { NameContext } from "../../context/NameContext";
import { ProfileContext } from "../../context/ProfileContext";
import ModalCode from "../../Modals/ModalCode";
const Avtars = ReturnAvtars();
function TopProfile(props) {

  // loader 
  const setLoad = useContext(LoaderContext);
  const set_User_Avtar = useContext(ProfileContext);
  const set_User_Name = useContext(NameContext);

  // states of database 
  const [userName, setName] = useState(props.username);
  const [userEmail, setEmail] = useState(props.email);
  const [editMode, setMode] = useState(false);
  const [imgIndex, setImgIndex] = useState(props.profileIMG);

  // state for updating details
  const [changeUserName, setChangeUserName] = useState(userName);
  const [changeEmail, setChangeEmail] = useState(userEmail);
  const [changeImgIndex, setChangeImgIndex] = useState(imgIndex);
  const [cahngeIMG,setChangeIMG] = useState(Avtars[changeImgIndex].src);

  // left move photo
  // const leftMove = () => {
  //   if (changeImgIndex == 0) {
  //     setChangeImgIndex(Avtars.length - 1);
  //   } else {
  //     setChangeImgIndex(changeImgIndex - 1);
  //   }
  //   console.log(changeImgIndex);
  //   setChangeIMG(Avtars[changeImgIndex].src);
  // };

  // // right move photo
  // const rightMove = () => {
  //   if (changeImgIndex == Avtars.length - 1) {
  //     setChangeImgIndex(0);
  //   } else {
  //     setChangeImgIndex(changeImgIndex + 1);
  //   }
  //   console.log(changeImgIndex);
  //   setChangeIMG(Avtars[changeImgIndex].src);
  //   // setImg(Avtars[inde].src);
  // };
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
        `/api/v1/user/update/${localStorage.getItem("id")}`,
        { username, email, profileIMG },
        config
      );
      setLoad(0);
    } catch (e) {
      console.log(e);
    }
    setLoad(0);
  };

  // return jsx
  return (
    <div className="main-profile-top">
      <div className="main-profile-avtar">
        <div className="main-profile-avtar-frame">
          <img src={cahngeIMG} />
          <div className="dot"></div>
          <div className="left-arrow" id="left-arrow">
            <i class="fas fa-chevron-left" onClick={()=>{
              console.log(changeImgIndex);
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
        <div className="details">
          <h3>Name</h3>
          <input
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
                setChangeUserName(userName);
                setChangeEmail(userEmail);
                setChangeImgIndex(imgIndex);
                setChangeIMG(Avtars[imgIndex].src);
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
              setEmail(changeEmail);
              setImgIndex(changeImgIndex);
              setName(changeUserName);
              setChangeIMG(Avtars[changeImgIndex].src);
              set_User_Avtar(cahngeIMG);
              set_User_Name(userName);
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
