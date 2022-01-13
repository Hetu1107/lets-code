import React from 'react';
import Main from './Main';
import LoginSignup from '../Login-signup/LoginSignup';
import Nav from '../Navbar/Nav';
import '../style/Home.scss';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Profile from '../User/Profile';
import src from '../../assets/avtars/2.jpg'
import Friends from '../User/Friends';
import { useState } from 'react/cjs/react.development';
import Sidebar from '../Navbar/Sidebar';
function Home() {

    const [user_Name,set_User_Name] = useState('Hetu1107');
    const [user_Email,set_User_Email] = useState('hetu200211@gmail.com');
    const [user_Avtar,set_User_Avtar] = useState(src);
    return (
        <div className='main-home-page' id='main-home-page'>
            <Sidebar user_Name={user_Name} user_Email = {user_Email} user_Avtar={user_Avtar}/>
            <Nav user_Name={user_Name} user_Email = {user_Email} user_Avtar={user_Avtar}/>
            <Routes>
                <Route path="/register" element={<LoginSignup/>}/>
                <Route path="/" element={<Main/>}/>
                <Route path="/user" element={<Profile user_Name={user_Name} user_Email = {user_Email} user_Avtar={user_Avtar} set_User_Name={set_User_Name} set_User_Email={set_User_Email} set_User_Avtar={set_User_Avtar}/>}/>
                <Route path="/user/friends" element={<Friends/>}/>
                <Route path="*" element={<Main/>}/>
            </Routes>
        </div>
    )
}

export default Home
