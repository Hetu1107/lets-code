import React, { useState, useEffect, useRef, useCallback } from "react";
import Quill from "quill";

// editor styles
import "quill/dist/quill.snow.css";
import "../../style/CodeEditor.scss";
function LeftEditor() {
  const [quill, setQuill] = useState();
  useEffect(() => {
    if (quill == null) return;
    quill.insertText(1,'\n');
    quill.insertText(4,'\n');
    quill.insertText(3,'  \n');
    quill.insertText(6,'}\n');
    quill.insertText(5,"return 0;");
    quill.insertText(2,"int main(){\n");
    quill.insertText(0,'#include<bits/stdc++.h>\n')
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source !== "user") return;
      console.log(quill.getText())
    });
  }, [quill]);
  const editorRef = useCallback((editor) => {
    if (editor == null) return;
    editor.innerHTML = "";
    const codeEditor = document.createElement("div");
    editor.append(codeEditor);
    let q = new Quill(codeEditor, { theme: "snow" });
    setQuill(q);
  },[]);
  return (
    <div className="left-editor">
      <div className="top">
        <div>
          <h3>Hetu.cpp</h3>
          <span>&times;</span>
        </div>
      </div>
      <div id="code-editor" className="main-editor-code" ref={editorRef}></div>
    </div>
  );
}

export default LeftEditor;
