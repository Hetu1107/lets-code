import React, { useState, useEffect } from "react";
import cpp from "../../../assets/images/c.png";
import cpp2 from "../../../assets/svg/cpp.svg";
function Files(props) {
  const [id, setId] = useState("");
  const [files,setFiles] = useState(props.files);
  return (
    <div className="right-container-editor">
      {files.map((res, index) => {
        return (
          <div
            id={`file-${index}`}
            onClick={() => {
              if (id != "") {
                document.getElementById(id).classList.remove("selected-file");
              }
              document
                .getElementById(`file-${index}`)
                .classList.add("selected-file");
              setId(`file-${index}`);
              props.setSelectedFile(res)
            }}
          >
            <div className="img">
              <img src={cpp2} />
            </div>
            <div className="name">
              <h4>{`${res.name}.cpp`}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Files;
