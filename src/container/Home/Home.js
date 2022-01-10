import React from 'react'
import LoginSignup from '../Login-signup/LoginSignup'
import Nav from '../Navbar/Nav'
import '../style/Home.scss'
function Home() {
    return (
        <div className='main-home-page' id='main-home-page'>
            <Nav/>
            <LoginSignup/>
        </div>
    )
}

export default Home
