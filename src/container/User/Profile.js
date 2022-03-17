import React from "react";
import "../style/Profile.scss";
import BottomProfile from "./Profile/BottomProfile";
import TopProfile from "./Profile/TopProfile";

function Profile() {
  return (
    <div className="main-profile-page">
      <TopProfile/>
      <BottomProfile />
    </div>
  );
}

export default Profile;
