import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoaderContext } from "../context/LoaderContext";
import { UserContext } from "../context/UserContext";
import "../style/Rooms.scss";
import RoomCard from "./Room/RoomCard";

// svgs 
import { AiOutlineFolderAdd } from "react-icons/ai";

function Room() {
  const {setLoad} = useContext(LoaderContext);
  const { set_User_Rooms, user_Rooms, user_Id } = useContext(UserContext);
  const [Rooms, setRooms] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    setUserId(user_Id);
    setRooms(user_Rooms);
  }, [user_Rooms, user_Id]);
  const returnRooms = () => {
    if (!Rooms || Rooms.length == 0) {
      return (
        <div className="empty">
          <h3>Nothing is here...</h3>
        </div>
      );
    } else if (Rooms && userId) {
      return Rooms.map((res, index) => {
        return (
          <Link to={`${Rooms[index].roomID}`} key={`${Rooms[index].roomID}`} >
            <RoomCard data={res} index={index} />
          </Link>
        );
      });
    }
  };
  return (
    <div className="main-rooms-page">
      <div className="add-room">
        <button
          onClick={() => {
            document.getElementById("modal").classList.add("modal-active");
          }}
        >
          <AiOutlineFolderAdd/> create room
        </button>
      </div>
      {returnRooms()}
    </div>
  );
}

export default Room;
