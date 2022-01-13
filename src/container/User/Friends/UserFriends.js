import React from 'react'

function UserFriends() {
    return (
        <div className="main-friends">
        <div className="friends-list">
          <h2>Friends</h2>
          <div className="search-results select">
            <div className="main-bot-box active">
              <div className="left">
                <img src="" />
                <h4>Hetu</h4>
              </div>
              <div className="right">
                <i class="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="friends-common">
          <h2>Common-Rooms</h2>
          <div className="search-results select">
            <div className="main-bot-box">
              <div className="left">
                <h4>Room Name</h4>
              </div>
              <div className="right">
                <i class="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default UserFriends
