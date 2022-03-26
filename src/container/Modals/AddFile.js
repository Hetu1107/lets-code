import React from 'react'
import '../style/Modal.scss'
function AddFile(props) {
  return (
    <div id="modal_AddFile" class="modal">
      <div class="modal__content">
          <h1>Enter File Name</h1>
          <input type="text"/>
        <div class="modal__footer">
            <button>{props.name}</button>
        </div>

        <a class="modal__close" onClick={()=>{
            document.getElementById('modal_AddFile').classList.remove('modal-active');
        }}>
          &times;
        </a>
      </div>
    </div>
  )
}

export default AddFile