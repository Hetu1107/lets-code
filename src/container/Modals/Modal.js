import React from "react";
import '../style/Modal.scss'
function Modal() {
  return (
    <div id="modal" class="modal">
      <div class="modal__content">
          <h1>Enter new room name :</h1>
          <input type="text"/>
        <div class="modal__footer">
            <button>Save</button>
        </div>

        <a class="modal__close" onClick={()=>{
            document.getElementById('modal').classList.remove('modal-active');
        }}>
          &times;
        </a>
      </div>
    </div>
  );
}

export default Modal;
