import React, { useState, useEffect, useRef, useCallback } from "react";
import Quill from "quill";
import { io } from "socket.io-client";
// editor styles
import "quill/dist/quill.snow.css";
import "../../style/CodeEditor.scss";
function LeftEditor(props) {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [text, setText] = useState("");
  const [lines,setLines] = useState([1]);
  useEffect(() => {
    if (props == null) return;
    const s = io("/");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, [props]);

  // loading the perticular id document
  useEffect(() => {
    if (socket == null || quill == null || props == null) return;
    if (props.selectedFile == null) return;
    socket.once("load-document", (text) => {
      quill.setText(text);
      quill.enable();
    });
    socket.emit("get-document", props.selectedFile._id);
  }, [socket, quill, props]);

  // updating the file
  useEffect(() => {
    if (socket == null || quill == null || props == null) return;
    if (props.selectedFile == null) return;
    const interval = setInterval(() => {
      let a = props.selectedFile;
      a.text = quill.getText();
      var length = quill.getLines().length;
      let li = []
      for(var i =0;i<length;i++){
        li.push(<p>{i+1}</p>)
      }
      setLines(li);
      props.setSelectedFile(a);
      socket.emit("save-document", quill.getText());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill, props]);
  // recieved changes
  useEffect(() => {
    if (quill == null || socket == null || props == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("recieved-changes", handler);
    return () => {
      socket.off("recieved-changes", handler);
    };
  }, [socket, quill]);

  // useEffect for change in quill editor text
  useEffect(() => {
    if (quill == null || socket == null || props == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  // editor ref to a div with the id : code-editor
  const editorRef = useCallback(
    (editor) => {
      if (editor == null || props == null) return;
      editor.innerHTML = "";
      const codeEditor = document.createElement("div");
      editor.append(codeEditor);
      let q = new Quill(codeEditor, { theme: "snow" });
      q.disable();
      q.setText("Loading...");
      setQuill(q);
    },
    [props]
  );

  // check selected file if its null or not
  const checkSelectedFile = () => {
    if (props.selectedFile == null) {
      return (
        <div className="no-file-selected">
          <h2>No file Selected...</h2>
        </div>
      );
    } else {
      return (
        <>
          <div className="top">
            <div>
              <h3>{`${props.selectedFile.filename}.cpp`}</h3>
              <span onClick={() => props.setSelectedFile(null)}>&times;</span>
            </div>
          </div>
          <div className="lines-editor">
            <div className="lines">
              {
                lines.map((res)=>{
                  return(
                    res
                  )
                })
              }
            </div>
            <div
              id="code-editor"
              className="main-editor-code"
              ref={editorRef}
            ></div>
          </div>
        </>
      );
    }
  };
  return <div className="left-editor">{checkSelectedFile()}</div>;
}

export default LeftEditor;
