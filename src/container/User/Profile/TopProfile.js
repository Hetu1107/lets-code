import React, { useEffect, useState } from "react";
import ReturnAvtars from "../../Avtars/Avtar";
import ModalCode from "../../Navbar/ModalCode";
const Avtars = ReturnAvtars();
function TopProfile(props) {
  const [userName, setName] = useState(props.props.user_Name);
  const [userEmail, setEmail] = useState(props.props.user_Email);
  const [image, setImg] = useState(props.props.user_Avtar);
  const [editMode, setMode] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const leftMove = () => {
    let inde = 0;
    if (imgIndex == 0) {
      setImgIndex(Avtars.length - 1);
      inde = Avtars.length - 1;
    } else {
      setImgIndex(imgIndex - 1);
      inde = imgIndex - 1;
    }
    setImg(Avtars[inde].src);
  };
  const rightMove = () => {
    let inde = 0;
    if (imgIndex == Avtars.length - 1) {
      setImgIndex(0);
      inde = 0;
    } else {
      setImgIndex(imgIndex + 1);
      inde = imgIndex + 1;
    }
    setImg(Avtars[inde].src);
  };
  useEffect(() => {
    if (editMode == false) {
      document.getElementById("left-arrow").style.display = "none";
      document.getElementById("right-arrow").style.display = "none";
    }
  });
  return (
    <div className="main-profile-top">
      <ModalCode setMode = {setMode} userName={userName} userEmail={userEmail} image={image} props = {props.props} setName = {setName} setImg={setImg} setEmail={setEmail}/>
      <div className="main-profile-avtar">
        <div className="main-profile-avtar-frame">
          <img src={image} />
          <div className="dot"></div>
          <div className="left-arrow" id="left-arrow">
            <i class="fas fa-chevron-left" onClick={leftMove}></i>
          </div>
          <div className="right-arrow" id="right-arrow">
            <i class="fas fa-chevron-right" onClick={rightMove}></i>
          </div>
        </div>
      </div>
      <div className="main-profile-detail">
        <div className="details">
          <h3>Name</h3>
          <input
            value={userName}
            onChange={(e) => {
              setName(e.target.value);
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
            value={userEmail}
            onChange={(e) => {
              setEmail(e.target.value);
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
            onClick={() => {
              setMode(true);
              document.getElementById("left-arrow").style.display = "flex";
              document.getElementById("right-arrow").style.display = "flex";
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              document
                .getElementById("modal-code")
                .classList.add("modal-active");
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
