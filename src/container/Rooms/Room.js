import React from 'react';
import '../style/Rooms.scss';
import RoomCard from './Room/RoomCard';


function Room(props) {
    const user_Rooms = props.user_Rooms;
    const data = {
        name : 'Hetu',
        owner : 'MH Patel'
    }
    return (
        <div className='main-rooms-page'>
            {
                user_Rooms.map((res,index)=>{
                    return(
                    <RoomCard data={res} index={index}/>
                    );
                })
            }
        </div>
    )
}

export default Room
