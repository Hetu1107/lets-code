import React from "react";
import "../style/Profile.scss";
import BottomProfile from "./Profile/BottomProfile";
import TopProfile from "./Profile/TopProfile";

function Profile(props) {
  return (
    <div className="main-profile-page">
      <TopProfile props = {props}/>
      <BottomProfile />
    </div>
  );
}

export default Profile;
