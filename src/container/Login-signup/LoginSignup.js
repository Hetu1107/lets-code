import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../context/LoaderContext";
import "../style/Register.scss";
import { ErrorContext } from "../context/ErrorContext";

function LoginSignup() {
  const error = useContext(ErrorContext);
  const setLoad = useContext(LoaderContext);
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  useEffect(() => {
    if (localStorage.getItem("authToken-VNote")) {
      navigate("/user");
    }
  }, [navigate]);

  // register user
  const register = async (e) => {
    e.preventDefault();
    setLoad(1);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      let username = registerUsername;
      let email = registerEmail;
      let password = registerPassword;
      const { data } = await axios.post(
        "/api/v1/user/register",
        { username, email, password },
        config
      );
      localStorage.setItem("authToken-VNote", data.token);
      navigate("/user");
      setLoad(0);
    } catch (e) {
      error(e.response.data.error);
      setTimeout(() => {
        error("");
      }, 5000);
      setLoad(0);
    }
    setLoad(0);
  };

  // login user
  const login = async (e) => {
    e.preventDefault();
    setLoad(1);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      let email = loginEmail;
      let password = loginPassword;
      const { data } = await axios.post(
        "/api/v1/user/login",
        { email, password },
        config
      );
      if (data) {
        localStorage.setItem("authToken-VNote", data.token);
        navigate("/user");
        setLoad(0);
      }
    } catch (e) {
      error(e.response.data.error);
      setTimeout(() => {
        error("");
      }, 5000);
      setLoad(0);
    }
    setLoad(0);
  };
  return (
    <div className="form-main">
      <div className="fixed-main"></div>
      <div class="round one"></div>
      <div class="round two"></div>
      <div class="round three"></div>
      <div class="form">
        <form class="register-form" id="register-form" onSubmit={register}>
          <div class="form-quote">
            <h1>Register</h1>
          </div>
          <div class="form-body">
            <div class="form-input">
              <input
                type="text"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                class="form-input-text"
                required
              />
              <label class="form-input-label">Username</label>
            </div>
            <div class="form-input">
              <input
                type="text"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                class="form-input-text"
                required
              />
              <label class="form-input-label">Email</label>
            </div>
            <div class="form-input">
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                class="form-input-text"
                required
              />
              <label class="form-input-label">Password</label>
            </div>
            <button class="form-btn">Submit</button>
            <div class="form-info">
              <p>
                If you already have an account
                <h4
                  onClick={() => {
                    console.log("hey");
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
        <form class="login-form" id="login-form" onSubmit={login}>
          <div class="form-quote">
            <h1>Login</h1>
          </div>
          <div class="form-body">
            <div class="form-input">
              <input
                type="text"
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
                class="form-input-text"
                required
              />
              <label class="form-input-label">Email</label>
            </div>
            <div class="form-input">
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
                class="form-input-text"
                required
              />
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
