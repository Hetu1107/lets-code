import React from 'react'
import '../style/Nav.scss'

function Nav() {
    return (
        <nav>
        <div class="top-nav">
            <div class="blue-top">
            </div>
            <div class="white-top">
                <input type="checkbox" name="" id="check-menu"/>
                <label for="check-menu">
                    <div class="menu-bar">
                      <span class="menu-line"></span>
                      <span class="menu-line"></span>
                      <span class="menu-line"></span>
                      <span class="menu-line"></span>
                      <span class="menu-line"></span>
                      <span class="menu-line"></span>
                    </div>
                  
                  </label>
                  <div class="full-page"></div>
                  <div class="side-bar"></div>
            </div>
        </div>
    </nav>
    )
}

export default Nav
