import React, { useState } from "react";
import AddFriend from "./AddFriend";
import Files from "./Files";
import FriendsEditor from "./FriendsEditor";
import Run from "./Run";

function RightEditor() {
  const [select, setSelect] = useState(1);
  const [id, setId] = useState("files");
  const selected = () => {
    if (select == 1) {
      return <Files/>
    } else if (select == 2) {
      return <Run/>
    } else if(select == 3) {
      return <FriendsEditor/>
    }else{
      return <AddFriend/>
    }
  };
  return (
    <>
    {/* add file modal */}
    <div id="modal_AddFile" class="modal">
      <div class="modal__content">
          <h1>Enter File Name</h1>
          <input type="text"/>
        <div class="modal__footer">
            <button>Add</button>
        </div>

        <a class="modal__close" onClick={()=>{
            document.getElementById('modal_AddFile').classList.remove('modal-active');
        }}>
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
            document.getElementById("run-code").classList.add("active-editor");
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
        <div id="add-file" onClick={()=>{
            document.getElementById('modal_AddFile').classList.add('modal-active');
        }}>
          <i class="fas fa-folder-plus"></i>
        </div>
        <div id="add-friend"  onClick={() => {
            document.getElementById(id).classList.remove("active-editor");
            document.getElementById("add-friend").classList.add("active-editor");
            setId("add-friend");
            setSelect(4);
          }}>
          <i class="fas fa-user-plus"></i>
        </div>
      </div>
      {selected()}
    </div>
    </>
  );
}

export default RightEditor;
