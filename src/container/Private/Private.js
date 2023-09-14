import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { LoaderContext } from "../context/LoaderContext";
import { UserContext } from "../context/UserContext";
import { ErrorContext } from "../context/ErrorContext";
const Private = ({ component }) => {
  const error = useContext(ErrorContext);
  const navigate = useNavigate();
  const {setLoad} = useContext(LoaderContext);
  const token = localStorage.getItem("authToken-VNote");
  let {
    set_User_Index,
    set_User_Name,
    set_User_Email,
    user_Index,
    user_Name,
    user_Email,
  } = useContext(UserContext);
  if (!token) {
    navigate("/register");
  }
  const check = () => {
    if (localStorage.getItem("id")) {
      return component;
    } else {
      const getId = async () => {
        setLoad(1);
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        };
        try {
          await axios
            .get("https://lets-code-backend-f27r.onrender.com/api/private", config)
            .then((data) => {
              localStorage.setItem("id", data.data.id);
            })
            .then(async () => {
              if (localStorage.getItem("id")) {
                try {
                  await axios
                    .get(`https://lets-code-backend-f27r.onrender.com/api/v1/user/${localStorage.getItem("id")}`)
                    .then((res) => {
                      return res.data;
                    })
                    .then((data) => {
                      set_User_Name(data.user.username);
                      set_User_Index(data.user.profileIMG);
                      set_User_Email(data.user.email);
                      setLoad(0);
                    });
                } catch (e) {
                  error(e.response.data.error);
                  setLoad(0);
                  setTimeout(() => {
                    error("");
                  }, 5000);
                  navigate("/register");
                  // setting user to login type
                  set_User_Name("Login");
                }
              } else {
                error("Register First");
                setTimeout(() => {
                  error("");
                }, 5000);
                navigate("/register");
                // setting user to login type
                set_User_Name("Login");
                setLoad(0);
              }
            });
        } catch (e) {
          error(e.response.data.error);
          setTimeout(() => {
            error("");
          }, 5000);
          navigate("/register");
          setLoad(0);
        }
      };
      getId();
      return component;
    }
  };
  return check();
};
export default Private;
