import React from "react";
import Main from "./Main";
import LoginSignup from "../Login-signup/LoginSignup";
import Nav from "../Navbar/Nav";
import "../style/Home.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "../User/Profile";
import src from "../../assets/avtars/2.jpg";
import src2 from "../../assets/avtars/3.jpg";
import Friends from "../User/Friends";
import { useState } from "react/cjs/react.development";
import Sidebar from "../Navbar/Sidebar";
function Home() {
  const total_Users = [
    {
      name : 'Hey007',
      src : src,
    },
    {
      name : 'Hey008',
      src : src2,
    },
    {
      name : 'abc007',
      src : src,
    },
    {
      name : 'mohit007',
      src : src2,
    },
    {
      name : 'dhruv007',
      src : src,
    },
  ]
  const user_Friends = [
    {
      name: "Hey007",
      src: src2,
      rooms: ["Room1", "Room2", "Room3", "Room4"],
    },
    {
      name: "Hey008",
      src: src,
      rooms: ["Room1", "Room3", "Room4"],
    },
    {
      name: "Hey009",
      src: src2,
      rooms: ["Room1"],
    },
    {
      name: "Hey010",
      src: src,
      rooms: ["Room1", "Room2"],
    },
  ];
  const [user_Name, set_User_Name] = useState("Hetu1107");
  const [user_Email, set_User_Email] = useState("hetu200211@gmail.com");
  const [user_Avtar, set_User_Avtar] = useState(src);
  return (
    <div className="main-home-page" id="main-home-page">
      <Sidebar
        user_Name={user_Name}
        user_Email={user_Email}
        user_Avtar={user_Avtar}
      />
      <Nav
        user_Name={user_Name}
        user_Email={user_Email}
        user_Avtar={user_Avtar}
      />
      <Routes>
        <Route path="/register" element={<LoginSignup />} />
        <Route path="/" element={<Main />} />
        <Route
          path="/user"
          element={
            <Profile
              img_Index={1}
              password={1234}
              user_Name={user_Name}
              user_Email={user_Email}
              user_Avtar={user_Avtar}
              set_User_Name={set_User_Name}
              set_User_Email={set_User_Email}
              set_User_Avtar={set_User_Avtar}
            />
          }
        />
        <Route path="/user/friends" element={<Friends user_Friends={user_Friends} total_Users={total_Users} />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </div>
  );
}

export default Home;
