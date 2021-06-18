import React from 'react';
import {Avatar} from '@material-ui/core';
import Stoproundicon from '@material-ui/icons/StopRounded';
import './Chats.css'; 
import { useDispatch } from 'react-redux';
import {selectimage} from './userSlice';
import { useHistory } from 'react-router';
import { db } from './Firebase';
import ReactTimeago from 'react-timeago';


function Chats({id,username,timestamp,read,imageUrl,profilePic}){
    const dispatch = useDispatch(); 
    const history = useHistory();

    const open = () =>{
        if(!read) {
            dispatch(selectimage(imageUrl));
            db.collection('posts').doc(id).set(
                {
                    read:true,
                },
                {
                    merge:true
                }
            );
            history.push("chat/view");
        }
    }
    return (
        <div  onClick={open} className="chats">
            <Avatar src={profilePic} />
            <div className="chats__info">
                <h4>{username}</h4>
                <p>
                    Top to view -{" "} 
                    <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
                </p>

            </div>

            {!read && <Stoproundicon className="chats__readicon"/>}
        </div>
    );
}

export default Chats;