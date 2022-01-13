import React from 'react';
import Main from './Main';
import LoginSignup from '../Login-signup/LoginSignup';
import Nav from '../Navbar/Nav';
import '../style/Home.scss';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Profile from '../User/Profile';
import Friends from '../User/Friends';
function Home() {
    return (
        <div className='main-home-page' id='main-home-page'>
            <Nav/>
            <Routes>
                <Route path="/register" element={<LoginSignup/>}/>
                <Route path="/" element={<Main/>}/>
                <Route path="/user" element={<Profile/>}/>
                <Route path="/user/friends" element={<Friends/>}/>
                <Route path="*" element={<Main/>}/>
            </Routes>
        </div>
    )
}

export default Home
