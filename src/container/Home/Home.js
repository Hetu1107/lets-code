import React, { useEffect, useState,useContext } from "react";
import Main from "./Main";
import LoginSignup from "../Login-signup/LoginSignup";
import Nav from "../Navbar/Nav";
import "../style/Home.scss";
import { Routes, Route } from "react-router-dom";
import Profile from "../User/Profile";
import ReturnAvtars from "../Avtars/Avtar";
import Friends from "../User/Friends";
import Sidebar from "../Navbar/Sidebar";
import Room from "../Rooms/Room";
import Loading from "../Load/Loading";
import { LoaderContext } from "../context/LoaderContext";
import Private from "../Private/Private";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { ErrorContext } from "../context/ErrorContext";
let Avtars = ReturnAvtars();
function Home() {
  const error = useContext(ErrorContext);
  const Rooms = [
    {
      id: 1234,
      name: "Hetu Patel",
      owner: "Hetz",
    },
    {
      id: 4567,
      name: "Hetu Patel",
      owner: "Hetz",
    },
    {
      id: 687,
      name: "Hetu Patel",
      owner: "Hetz",
    },
    {
      id: 1234,
      name: "Hetu Patel",
      owner: "Hetz",
    },
    {
      id: 4567,
      name: "Hetu Patel",
      owner: "Hetz",
    },
    {
      id: 687,
      name: "Hetu Patel",
      owner: "Hetz",
    },
  ];
  const [userDetails, setUserDetails] = useState(1);
  const [user_Name, set_User_Name] = useState("Login");
  const [user_Email, set_User_Email] = useState("Not Found");
  const [user_Avtar, set_User_Avtar] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
  );
  const [user_Index, set_User_Index] = useState(null);
  const [user_Rooms, set_User_Rooms] = useState(Rooms);
  const [Load, setLoad] = useState(0);
  useEffect(async () => {
    setLoad(1);
    const getUser = async () => {
      const id = localStorage.getItem("id");
      if (id) {
        try {
          await axios
            .get(`/api/v1/user/${id}`)
            .then((res) => {
              return res.data;
            })
            .then((data) => {
              setUserDetails(data.user);
              set_User_Name(data.user.username);
              set_User_Index(data.user.profileIMG);
              set_User_Email(data.user.email);
            });
        } catch (e) {
          error(e.response.data.error);
          setTimeout(() => {
            error("");
          }, 5000);
          setLoad(0);
          // setting user to login type
          set_User_Name("Login");
        }
      } else {
        // setting user to login type
        set_User_Name("Login");
      }
    };
    await getUser();
    setLoad(0);
    return;
  }, []);
  const returnLoader = () => {
    if (Load) {
      return <Loading />;
    } else {
      return null;
    }
  };
  return (
    <div className="main-home-page" id="main-home-page">
      {returnLoader()}
      <UserContext.Provider
        value={{
          set_User_Index,
          set_User_Name,
          set_User_Email,
          user_Index,
          user_Name,
          user_Email,
        }}
      >
        <Sidebar />
        <Nav />
        <LoaderContext.Provider value={setLoad}>
          <Routes>
            <Route path="/register" element={<LoginSignup />} />
            <Route path="/" element={<Main />} />
            <Route
              path="/user"
              element={<Private component={<Profile />}></Private>}
            />
            <Route
              path="/user/friends"
              element={<Private component={<Friends />}></Private>}
            />
            <Route
              path="/user/rooms"
              element={
                <Private component={<Room user_Rooms={user_Rooms} />}></Private>
              }
            />
            <Route path="*" element={<Main />} />
          </Routes>
        </LoaderContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default Home;
