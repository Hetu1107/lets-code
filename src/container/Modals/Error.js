import React,{useEffect} from "react";
import "../style/Error.scss";

function Error(props) {
    useEffect(()=>{
        if(props.error.trim() == ""){
            document.getElementById("error-box").style.top = "-100%";
        }else{
            document.getElementById("error-box").style.top = "70px";
        }
    },[props.error])
  return (
    <div className="error-box error" id="error-box">
      <div>
        <h4>{props.error}</h4>
        <i
          class="fas fa-times"
          onClick={() => {
            document.getElementById("error-box").style.top = "-100%";
          }}
        ></i>
      </div>
    </div>
  );
}

export default Error;
