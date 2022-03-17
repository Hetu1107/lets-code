import React,{useContext} from "react";
import { LoaderContext } from "../context/LoaderContext";
import "../style/Register.scss";

function LoginSignup() {
  const setLoad = useContext(LoaderContext);
  return (
    <div className="form-main">
      <div className="fixed-main">
        </div>
      <div class="round one"></div>
      <div class="round two"></div>
      <div class="round three"></div>
      <div class="form">
        <form class="register-form" id="register-form">
          <div class="form-quote">
            <h1>Register</h1>
          </div>
          <div class="form-body">
            <div class="form-input">
              <input type="text" class="form-input-text" required />
              <label class="form-input-label">Username</label>
            </div>
            <div class="form-input">
              <input type="text" class="form-input-text" required />
              <label class="form-input-label">Email</label>
            </div>
            <div class="form-input">
              <input type="password" class="form-input-text" required />
              <label class="form-input-label">Password</label>
            </div>
            <button class="form-btn">Submit</button>
            <div class="form-info">
              <p>
                If you already have an account
                <h4
                  onClick={() => {
                      console.log('hey')
                    document.getElementById("login-form").style.top = "-100%";
                    document.getElementById("register-form").style.top = "150%";
                  }}
                >
                  sign-in
                </h4>
              </p>
            </div>
          </div>
        </form>
        <form class="login-form" id="login-form">
          <div class="form-quote">
            <h1>Login</h1>
          </div>
          <div class="form-body">
            <div class="form-input">
              <input type="text" class="form-input-text" required />
              <label class="form-input-label">Username</label>
            </div>
            <div class="form-input">
              <input type="password" class="form-input-text" required />
              <label class="form-input-label">Password</label>
            </div>
            <button class="form-btn">Login</button>
            <div class="form-info">
              <p>
                If you don't have an account
                <h4
                  onClick={() => {
                    document.getElementById("login-form").style.top = "50%";
                    document.getElementById("register-form").style.top = "0";
                  }}
                >
                  regiter
                </h4>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginSignup;
