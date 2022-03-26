import React from 'react';
import LeftEditor from './left/Left';
import RightEditor from './right/Right';

// importing style 
import '../style/Editor.scss';

function Editor() {
  return (
    <div className='main-editor-screen'>
        <LeftEditor/>
        <RightEditor/>
    </div>
  )
}

export default Editor