import React from "react";

function TopProfile() {
  return (
    <div className="main-profile-top">
      <div className="main-profile-avtar">
        <div className="main-profile-avtar-frame">
          <img src="https://cdn4.vectorstock.com/i/thumb-large/77/83/cute-young-man-with-glasses-avatar-cartoon-style-vector-36327783.jpg" />
          <div className="dot"></div>
        </div>
      </div>
      <div className="main-profile-detail">
        <div className="details">
          <h3>Name</h3>
          <input />
        </div>
        <div className="details">
          <h3>Email</h3>
          <input />
        </div>
        <div className="details-button">
          <button>Edit</button>
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
