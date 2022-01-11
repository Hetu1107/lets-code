import React from 'react';
import Main from './Main';
import LoginSignup from '../Login-signup/LoginSignup';
import Nav from '../Navbar/Nav';
import '../style/Home.scss';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Profile from '../User/Profile';
function Home() {
    return (
        <div className='main-home-page' id='main-home-page'>
            <Nav/>
            <Routes>
                <Route path="/register" element={<LoginSignup/>}/>
                <Route path="/" element={<Main/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="*" element={<Main/>}/>
            </Routes>
        </div>
    )
}

export default Home
