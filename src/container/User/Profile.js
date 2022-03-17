import axios from "axios";
import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../context/LoaderContext";
import "../style/Profile.scss";
import BottomProfile from "./Profile/BottomProfile";
import TopProfile from "./Profile/TopProfile";

function Profile() {
  const navigate = useNavigate();
  // Loader 
  const setLoad = useContext(LoaderContext);

  // userDetails 
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    setLoad(1);
    const getUser = async () => {
      const id = localStorage.getItem("id");
      if(!id){
        navigate("/register");
      }
      try {
        await axios.get(`/api/v1/user/${id}`).then((res)=>{
          return res.data;
        }).then((data)=>{
          setUserDetails(data.user);
        });
      } catch (e) {
        console.log(e);
      }
    };
    setLoad(0);
    getUser();
    console.log(userDetails);
  }, []);
  return (
    <div className="main-profile-page">
      {userDetails && <TopProfile username={userDetails.username} email={userDetails.email} profileIMG={userDetails.profileIMG}/>}
      <BottomProfile />
    </div>
  );
}

export default Profile;
