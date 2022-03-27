import React,{useState,useEffect} from 'react';
import LeftEditor from './left/Left';
import RightEditor from './right/Right';

// importing style 
import '../style/Editor.scss';

function Editor() {
  let defaultText = "#include<iostream>\nusing namespace std;\n\nint main(){\n\nreturn 0;\n}"
  let user_files = [
    {
        name : "Hetu",
        text : defaultText
    },
    {
      name : "Het",
      text : defaultText
    }
  ]
  const [files,setFiles] = useState(user_files);
  const [people,setPeople] = useState();
  const [friends,setFriends] = useState();
  const [selectedFile,setSelectedFile] = useState(null);
  return (
    <div className='main-editor-screen'>
        <LeftEditor selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
        <RightEditor setSelectedFile={setSelectedFile} files={files} setFiles={setFiles}/>
    </div>
  )
}

export default Editor