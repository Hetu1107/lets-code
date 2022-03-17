import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import {useEffect,useContext} from 'react';
import { LoaderContext } from "../context/LoaderContext";
const Private = ({component})=>{
    const navigate = useNavigate();
    const setLoad = useContext(LoaderContext);
    const token = localStorage.getItem("authToken-VNote");
    if(!token){
        navigate("/register");
    }
    useEffect(()=>{
        const getId = async()=>{
            setLoad(1);
            const config = {
                headers:{
                    "Content-Type" : "application/json",
                    authorization : `Bearer ${token}`
                }
            }
            try{
                const {data} = await axios.get("/api/private",config);
                localStorage.setItem("id",data.id);
            }
            catch(e){
                console.log(e);
            }
            setLoad(0);
        }
        getId();
    },[navigate])
    return localStorage.getItem("authToken-VNote") ? component : <Navigate to="/register"/>;
}
export default Private