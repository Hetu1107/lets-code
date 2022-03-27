import React, { useState, useEffect, useRef, useCallback } from "react";
import Quill from "quill";

// editor styles
import "quill/dist/quill.snow.css";
import "../../style/CodeEditor.scss";
function LeftEditor(props) {
  const [quill, setQuill] = useState();
  const [text,setText] = useState("");
  // useEffect for change in quill editor text 
  useEffect(() => {
    if (quill == null) return;
    setText(props.selectedFile.text);
    quill.setText(props.selectedFile.text);
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source !== "user") return;
      console.log(quill.getText());
    });
  }, [quill]);


  // editor ref to a div with the id : code-editor 
  const editorRef = useCallback((editor) => {
    if (editor == null) return;
    editor.innerHTML = "";
    const codeEditor = document.createElement("div");
    editor.append(codeEditor);
    let q = new Quill(codeEditor, { theme: "snow" });
    setQuill(q);
  }, []);


  // check selected file if its null or not 
  const checkSelectedFile = () => {
    if (props.selectedFile == null) {
      return <div className="no-file-selected"><h2>No file Selected...</h2></div>;
    } else {
      return (
        <>
          <div className="top">
            <div>
              <h3>{`${props.selectedFile.name}.cpp`}</h3>
              <span onClick={()=>props.setSelectedFile(null)}>&times;</span>
            </div>
          </div>
          <div
            id="code-editor"
            className="main-editor-code"
            ref={editorRef}
          ></div>
        </>
      );
    }
  };
  return <div className="left-editor">{checkSelectedFile()}</div>;
}

export default LeftEditor;
