import React, { useState, useEffect, useContext } from "react";
import LeftEditor from "./left/Left";
import RightEditor from "./right/Right";

// importing style
import "../style/Editor.scss";
import { LoaderContext } from "../context/LoaderContext";
import { ErrorContext } from "../context/ErrorContext";
import axios from "axios";
import { useParams } from "react-router-dom";

function Editor() {
  const { id } = useParams();
  // getting contexts
  const {setLoad} = useContext(LoaderContext);
  const error = useContext(ErrorContext);

  const [files, setFiles] = useState([]);
  const [people, setPeople] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    setLoad(1);
    const getFiles = async () => {
      try {
        await axios
          .get(`https://lets-code-backend-f27r.onrender.com/api/v1/rooms/room/${id}`)
          .then((res) => {
            setPeople(res.data.people);
            setFiles(res.data.filesData);
            setLoad(0);
          })
          .then(async () => {
            // getting all the users
            try {
              await axios
                .get(`https://lets-code-backend-f27r.onrender.com/api/v1/friends/getfriends/${localStorage.getItem("id")}`)
                .then((res) => {
                  return res.data;
                })
                .then((data) => {
                  setFriends(data.friends);
                })
                .catch((e) => {
                  setLoad(0);
                  error(e.response.data.error);
                  setTimeout(() => {
                    error("");
                  }, 5000);
                });
            } catch (e) {
              error(e.response.data.error);
              setTimeout(() => {
                error("");
              }, 5000);
            }
          });
      } catch (e) {
        error(e.response.data.error);
        setTimeout(() => {
          error("");
        }, []);
        setLoad(0);
      }
    };
    getFiles();
  }, []);
  return (
    <div className="main-editor-screen">
      <LeftEditor
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        roomID={id}
      />
      <RightEditor
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        files={files}
        setFiles={setFiles}
        roomID={id}
        people={people}
        setPeople={setPeople}
        friends={friends}
      />
    </div>
  );
}

export default Editor;
