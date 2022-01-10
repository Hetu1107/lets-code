import React from 'react'
import '../style/Nav.scss'

let toggle = 0;
function Nav() {
    return (
        <nav class="top-nav">
                <div className='left-nav' id='left-nav'></div>
                <div className='right-nav' id='right-nav'>
                <button className='nav-toggle' onClick={()=>{
                    if(toggle==0){
                    document.getElementById('left-nav').style.width = "170px";
                    document.getElementById('right-nav').style.width = "calc(100% - 170px)";
                    document.getElementById('sidebar').style.width = "170px";
                    document.getElementById('main-home-page').style.width = "calc(100% - 170px)";
                    toggle = 1;
                    }
                    else{
                        document.getElementById('left-nav').style.width = "70px";
                    document.getElementById('right-nav').style.width = "calc(100% - 70px)";
                    document.getElementById('sidebar').style.width = "70px";
                    document.getElementById('main-home-page').style.width = "calc(100% - 70px)"
                    toggle = 0;
                    }
                }}>
                     <span></span>   
                     <span></span>
                     <span></span>
                </button>
                </div>
        </nav>
    )
}

export default Nav
