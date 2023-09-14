import axios from "axios";
import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ErrorContext } from "../../context/ErrorContext";
import { LoaderContext } from "../../context/LoaderContext";
import AddFriend from "./AddFriend";
import Files from "./Files";
import FriendsEditor from "./FriendsEditor";
import Run from "./Run";

function RightEditor(props) {
  // contexts
  const {setLoad} = useContext(LoaderContext);
  const error = useContext(ErrorContext);

  // selected file
  const [select, setSelect] = useState(1);
  const [id, setId] = useState("files"); // selected file id

  // change component on selected value
  const selected = () => {
    if (select == 1) {
      return (
        <Files
          files={props.files}
          setFiles={props.setFiles}
          setSelectedFile={props.setSelectedFile}
        />
      );
    } else if (select == 2) {
      return <Run selectedFile={props.selectedFile}/>;
    } else if (select == 3) {
      return <FriendsEditor people={props.people} setPeople={props.setPeople} id={props.roomID}/>;
    } else {
      return <AddFriend friends={props.friends} people={props.people} id={props.roomID} setPeople={props.setPeople}/>;
    }
  };

  // adding files in perticular room
  const [filename, setFileName] = useState("");
  const text =
    "#include<iostream>\nusing namespace std;\n\nint main(){\n\nreturn 0;\n}";

  // add file 
  const addFile = async () => {
    setLoad(1);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios
        .post(
          `https://lets-code-backend-f27r.onrender.com/api/v1/rooms/room/create/${props.roomID}`,
          { filename, text },
          config
        )
        .then((res) => {
          props.setFiles([...props.files, res.data.file]);
          setLoad(0);
          error(`new file : ${res.data.file.filename} added`);
          setFileName("");
          setTimeout(() => {
            error("");
          }, 5000);
          document
            .getElementById("modal_AddFile")
            .classList.remove("modal-active");
        });
    } catch (e) {
      setLoad(0);
      error(e.response.data.error);
      setTimeout(() => {
        error("");
      }, []);
    }
  };

  // return jsx 
  return (
    <>
      {/* add file modal */}
      <div id="modal_AddFile" class="modal">
        <div class="modal__content">
          <h1>Enter File Name</h1>
          <input
            type="text"
            value={filename}
            onChange={(e) => setFileName(e.target.value)}
          />
          <div class="modal__footer">
            <button onClick={addFile}>Add</button>
          </div>

          <a
            class="modal__close"
            onClick={() => {
              document
                .getElementById("modal_AddFile")
                .classList.remove("modal-active");
            }}
          >
            &times;
          </a>
        </div>
      </div>
      {/* add friend modal  */}
      {/* main code  */}
      <div className="right-editor">
        <div className="top">
          <div
            id="files"
            className="active-editor"
            onClick={() => {
              document.getElementById(id).classList.remove("active-editor");
              document.getElementById("files").classList.add("active-editor");
              setId("files");
              setSelect(1);
            }}
          >
            <i class="fas fa-file-code"></i>
          </div>
          <div
            id="run-code"
            onClick={() => {
              document.getElementById(id).classList.remove("active-editor");
              document
                .getElementById("run-code")
                .classList.add("active-editor");
              setId("run-code");
              setSelect(2);
            }}
          >
            <i class="fas fa-code"></i>
          </div>
          <div
            id="friends-list"
            onClick={() => {
              document.getElementById(id).classList.remove("active-editor");
              document
                .getElementById("friends-list")
                .classList.add("active-editor");
              setId("friends-list");
              setSelect(3);
            }}
          >
            <i class="fas fa-user-friends"></i>
          </div>
          <div
            id="add-file"
            onClick={() => {
              document
                .getElementById("modal_AddFile")
                .classList.add("modal-active");
            }}
          >
            <i class="fas fa-folder-plus"></i>
          </div>
          <div
            id="add-friend"
            onClick={() => {
              document.getElementById(id).classList.remove("active-editor");
              document
                .getElementById("add-friend")
                .classList.add("active-editor");
              setId("add-friend");
              setSelect(4);
            }}
          >
            <i class="fas fa-user-plus"></i>
          </div>
        </div>
        {selected()}
      </div>
    </>
  );
}

export default RightEditor;
