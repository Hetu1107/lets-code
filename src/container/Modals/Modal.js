import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../context/ErrorContext";
import { LoaderContext } from "../context/LoaderContext";
import { UserContext } from "../context/UserContext";
import "../style/Modal.scss";
function Modal() {
  const [roomname, setRoomName] = useState("");
  const { set_User_Rooms, user_Name, user_Rooms, user_Id } =
    useContext(UserContext);
  const error = useContext(ErrorContext);
  const { Load, setLoad } = useContext(LoaderContext);
  const navigate = useNavigate();
  const createRoom = () => {
    setLoad(1);
    const token = localStorage.getItem("authToken-VNote");
    if (roomname.trim() == "") {
      error("please provide valid name");
      setTimeout(() => {
        error("");
      }, 5000);
      setLoad(0);
      return;
    }
    if (!token) {
      error(`login first`);
      setTimeout(() => {
        error("");
      }, 5000);
      navigate("/register");
    }
    const create = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      try {
        await axios
          .post(
            `https://lets-code-backend-f27r.onrender.com/api/v1/rooms/create/${user_Id}`,
            { roomname },
            config
          )
          .then((data) => {
            setLoad(0);
            set_User_Rooms([...user_Rooms, data.data.detail]);
            document.getElementById("modal").classList.remove("modal-active");
            setRoomName(""); // setting the room name to null string
            error(`new room : ${data.data.detail.roomname} created`);
            setTimeout(() => {
              error("");
            }, 5000);
          });
      } catch (e) {
        error(e.response.data.error);
        setTimeout(() => {
          error("");
        }, 5000);
        setLoad(0);
      }
    };
    create();
  };
  return (
    <div id="modal" class="modal">
      <div class="modal__content">
        <h1>Enter new room name :</h1>
        <input
          type="text"
          value={roomname}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <div class="modal__footer">
          <button onClick={createRoom}>Save</button>
        </div>

        <a
          class="modal__close"
          onClick={() => {
            setRoomName("");
            document.getElementById("modal").classList.remove("modal-active");
          }}
        >
          &times;
        </a>
      </div>
    </div>
  );
}

export default Modal;
