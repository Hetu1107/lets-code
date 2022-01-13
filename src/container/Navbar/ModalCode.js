import React from "react";

function ModalCode(props) {
  return (
    <div id="modal-code" class="modal">
      <div class="modal__content">
        <h1>Enter Password :</h1>
        <input type="password" />
        <div class="modal__footer">
          <button onClick={()=>{
            if(true){
              props.props.set_User_Name(props.userName);
              props.props.set_User_Email(props.userEmail);
              props.props.set_User_Avtar(props.image);
              props.setMode(false);
              document
              .getElementById("modal-code")
              .classList.remove("modal-active");
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
