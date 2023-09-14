import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../context/LoaderContext";
import "../style/Register.scss";
import { ErrorContext } from "../context/ErrorContext";

// icons
import { AiOutlineMail } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import Loading from "../Load/Loading";

function LoginSignup() {
  const error = useContext(ErrorContext);
  const {Load,setLoad} = useContext(LoaderContext);
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
      await axios
        .post("https://lets-code-backend-f27r.onrender.com/api/v1/user/register", { username, email, password }, config)
        .then((d) => {
          return localStorage.setItem("authToken-VNote", d.data.token);
        })
        .then(() => {
          navigate("/user");
          setLoad(0);
        })
        .catch((e) => {
          setLoad(0);
          error(e.response.data.error);
          setTimeout(() => {
            error("");
          }, 5000);
        });
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
      await axios
        .post("https://lets-code-backend-f27r.onrender.com/api/v1/user/login", { email, password }, config)
        .then((d) => {
          return localStorage.setItem("authToken-VNote", d.data.token);
        })
        .then(() => {
          navigate("/user");
          setLoad(0);
        })
        .catch((e) => {
          setLoad(0);
          error(e.response.data.error);
          setTimeout(() => {
            error("");
          }, 5000);
        });
    } catch (e) {
      setTimeout(() => {
        error("");
      }, 5000);
      setLoad(0);
    }
    setLoad(0);
  };
  return (
    <>
    {Load ? <Loading /> : ""}
    <div className="form-main">
      <div className="side-box-form form-left">
        <div className="fixed-main"></div>
        {/* <h1>Edicomp</h1> */}
      </div>
      <div className="side-box-form form-right">
        <form className="form-box login-form" id="login-form" onSubmit={login}>
          <h1>Welcome back</h1>
          <p>Create | compile | Collaborate</p>
          <div className="form">
            <div className="input-box">
              <input
                type="text"
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
                class="form-input-text"
                placeholder="name@gmail.com"
                required
              />
              <div className="label-input">
                <AiOutlineMail />
              </div>
            </div>
            <div className="input-box">
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
                class="form-input-text"
                placeholder="min 8 characters"
                required
              />
              <div className="label-input">
                <BsKey />
              </div>
            </div>
            <div className="input-box">
              <button>Login</button>
            </div>
          </div>
          <div className="line-box">
            <div className="line"></div>
            <p>or</p>
            <div className="line"></div>
          </div>
          <div className="change-box">
            <p>
              Don’t have an account?{" "}
              <span
                onClick={() => {
                  const ele = document.getElementById("register-form");
                  const ele2 = document.getElementById("login-form");
                  ele2.style.opacity = 0;
                  setTimeout(() => {
                    ele.style.display = "flex";
                    ele.style.opacity = "1";
                    ele2.style.display = "none";
                  }, 500);
                }}
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
        <form
          className="form-box register-form"
          id="register-form"
          onSubmit={register}
        >
          <h1>Hola User!</h1>
          <p>Create | compile | Collaborate</p>
          <div className="form">
            <div className="input-box">
              <input
                type="text"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                class="form-input-text"
                required
                placeholder="hetu1107"
              />
              <div className="label-input">
                <BiUser />
              </div>
            </div>
            <div className="input-box">
              <input
                type="text"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                class="form-input-text"
                placeholder="name@gmail.com"
                required
              />
              <div className="label-input">
                <AiOutlineMail />
              </div>
            </div>
            <div className="input-box">
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                class="form-input-text"
                placeholder="min 8 characters"
                required
              />
              <div className="label-input">
                <BsKey />
              </div>
            </div>
            <div className="input-box">
              <button>Register</button>
            </div>
          </div>
          <div className="line-box">
            <div className="line"></div>
            <p>or</p>
            <div className="line"></div>
          </div>
          <div className="change-box">
            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  const ele2 = document.getElementById("register-form");
                  const ele = document.getElementById("login-form");
                  ele2.style.opacity = 0;
                  setTimeout(() => {
                    ele.style.display = "flex";
                    ele.style.opacity = "1";
                    ele2.style.display = "none";
                  }, 500);
                }}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>

      {/* <div className="fixed-main"></div> */}
      {/* <div class="round one"></div>
      <div class="round two"></div>
      <div class="round three"></div> */}
      {/* <div class="form">
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
      </div> */}
    </div>    
    </>
  );
}

export default LoginSignup;
