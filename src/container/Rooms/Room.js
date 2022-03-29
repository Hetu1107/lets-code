import React,{useContext,useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { LoaderContext } from '../context/LoaderContext';
import { UserContext } from '../context/UserContext';
import '../style/Rooms.scss';
import RoomCard from './Room/RoomCard';


function Room() {
    const setLoad = useContext(LoaderContext);
    const {set_User_Rooms,user_Rooms,user_Id} = useContext(UserContext);
    const [Rooms,setRooms] = useState(null);
    const [userId,setUserId] = useState(null);
    useEffect(()=>{
        setUserId(user_Id);
        setRooms(user_Rooms);
    },[user_Rooms,user_Id])
    const returnRooms = ()=>{
        if(Rooms && userId){
            return(
                Rooms.map((res,index)=>{
                    return(
                    <Link to={`${Rooms[index].roomID}`}><RoomCard data={res} index={index}/></Link>
                    );
                })
            )
        }
    }
    return (
        <div className='main-rooms-page'>
            {returnRooms()}
        </div>
    )
}

export default Room
