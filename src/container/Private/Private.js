import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { LoaderContext } from "../context/LoaderContext";
import { UserContext } from "../context/UserContext";
const Private = ({ component }) => {
  const navigate = useNavigate();
  const setLoad = useContext(LoaderContext);
  const token = localStorage.getItem("authToken-VNote");
  let { set_User_Index, set_User_Name, set_User_Email, user_Name } =
    useContext(UserContext);
  if (!token) {
    navigate("/register");
  }
  useEffect(() => {
    const getId = async () => {
      setLoad(1);
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get("/api/private", config);
        localStorage.setItem("id", data.id);
        const id = localStorage.getItem("id");
        if (id) {
          try {
            await axios
              .get(`/api/v1/user/${id}`)
              .then((res) => {
                return res.data;
              })
              .then((data) => {
                set_User_Name(data.user.username);
                set_User_Index(data.user.profileIMG);
                set_User_Email(data.user.email);
                console.log(user_Name);
              });
          } catch (e) {
            console.log(e);
            setLoad(0);
            // setting user to login type
            set_User_Name("Login");
          }
        } else {
          // setting user to login type
          set_User_Name("Login");
        }
      } catch (e) {
        console.log(e);
      }
      setLoad(0);
    };
    getId();
    setLoad(0);
  }, []);
  return localStorage.getItem("authToken-VNote") ? (
    component
  ) : (
    <Navigate to="/register" />
  );
};
export default Private;
