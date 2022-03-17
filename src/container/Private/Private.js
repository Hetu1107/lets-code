import axios from "axios";
import { useNavigate } from "react-router-dom";

const Private = ({component})=>{
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");
    const getId = async()=>{
        const config = {
            headers:{
                "Content-Type" : "application/json",
                Authorization : `Bearer ${localStorage.getItem("authToken")}`
            }
        }
        try{
            const {data} = await axios.get("/api/private");
            localStorage.setItem({id : data.id});
        }
        catch(e){
            console.log(e);
        }
    }
}