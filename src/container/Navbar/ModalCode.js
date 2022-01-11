import React from 'react'

function ModalCode() {
    return (
        <div id="modal-code" class="modal">
      <div class="modal__content">
          <h1>Enter Password :</h1>
          <input type="password"/>
        <div class="modal__footer">
            <button>Confirm</button>
        </div>

        <a class="modal__close" onClick={()=>{
            document.getElementById('modal-code').classList.remove('modal-active');
        }}>
          &times;
        </a>
      </div>
    </div>
    )
}

export default ModalCode
