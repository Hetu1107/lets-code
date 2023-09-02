import React from "react";
import { Link } from "react-router-dom";
import "../style/Main.scss";
import Lottie from "react-lottie-player";
import doc2 from "../Lottie/doc.json";
import doc from "../Lottie/doc2.json";

function Main() {
  return (
    <div className="main-home">
      {/* <div className="fixed-main"></div> */}
      <div className="box-ani lr"></div>
      <div className="box-ani rl"></div>
      <div className="main-front-page">
        <div className="main-head">
          <h1 className="one">Create.</h1>
          <h1 className="two">Compile.</h1>
          <h1 className="three">Collaborate.</h1>
          <p>
            Create-Work-Build-Code together, just a click and start coding.
            Welcome to the <span>Lets's </span><span className="blue">Code</span> developers/coders.
          </p>
        </div>
        {/* <div className="main-img">
          <Lottie
            loop
            animationData={doc2}
            play
            style={{ width: 200, height: 200 }}
          />
        </div>
        <div className="main-head">
          <h1>The Best Place to work with files and friends.</h1>
        </div>
        <div className="main-button">
          <Link to="/register">
            <button>Login</button>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default Main;
