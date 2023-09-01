import React, { useState } from "react";

function ModalCode(props) {
  const [typedPass,setTypedPass] = useState(''); 
  return (
    <div id="modal-code" class="modal">
      <div class="modal__content">
        <h1>Enter Password :</h1>
        <input type="password" value={typedPass} onChange={(e)=>setTypedPass(e.target.value)}/>
        <h4 id="wrong-password">Please enter correct password.</h4>
        <div class="modal__footer">
          <button onClick={()=>{
            if(props.props.password == typedPass){
              setTypedPass('');
              document.getElementById('wrong-password').style.opacity = "0";
              props.props.set_User_Name(props.userName);
              props.props.set_User_Email(props.userEmail);
              props.props.set_User_Avtar(props.image);
              props.setMode(false);
              document
              .getElementById("modal-code")
              .classList.remove("modal-active");
            }
            else{
              document.getElementById('wrong-password').style.opacity = "1";
            }
          }}>Confirm</button>
        </div>

        <a
          class="modal__close"
          onClick={() => {
            props.setMode(false);
            props.setName(props.props.user_Name);
            props.setEmail(props.props.user_Email);
            props.setImg(props.props.user_Avtar);
            document.getElementById('wrong-password').style.opacity = "0";
            setTypedPass('');
            document
              .getElementById("modal-code")
              .classList.remove("modal-active");
          }}
        >
          &times;
        </a>
      </div>
    </div>
  );
}

export default ModalCode;
