import axios from "axios";
import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../context/LoaderContext";
import { UserContext } from "../context/UserContext";
import "../style/Profile.scss";
import BottomProfile from "./Profile/BottomProfile";
import TopProfile from "./Profile/TopProfile";

function Profile() {
  return (
    <div className="main-profile-page">
      {/* {userDetails && <TopProfile/>} */}
      <TopProfile/>
      {/* {userDetails && console.log(user_Name)} */}
      <BottomProfile />
    </div>
  );
}

export default Profile;
