import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

function Run(props) {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const runCode = () => {
    document.getElementById(
      "run-code-btn"
    ).innerHTML = `<i class="fa fa-spinner fa-spin"></i> Running`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const getResponse = async () => {
      try {
        const code = props.selectedFile.text;
        await axios
          .post(
            `https://lets-code-backend-f27r.onrender.com/api/v1/rooms/room/${props.selectedFile._id}`,
            { input, code },
            config
          )
          .then((res) => {
            setOutput(res.data.re);
            document.getElementById("run-code-btn").innerHTML = `Run`;
            return;
          })
          .catch((e) => {
            document.getElementById("run-code-btn").innerHTML = `Run`;
            return;
          });
      } catch (e) {
        // error(e.response.data.error);
        // setTimeout(() => {
        //   error("");
        // }, 5000);
        return;
      }
    };
    getResponse();
  };
  return (
    <div className="right-container-editor run">
      <div>
        <button onClick={runCode} id="run-code-btn">
          Run
        </button>
      </div>
      <div>
        <h4>Input</h4>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div>
        <h4>Output</h4>
        <textarea value={output} readOnly="true"></textarea>
      </div>
    </div>
  );
}

export default Run;
