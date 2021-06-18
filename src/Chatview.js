import React, { useEffect } from 'react';
import { selectSelectimage} from './userSlice';
import './Chatview.css';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';

 

function Chatview() {
    const selectSelectimages = useSelector(selectSelectimage);
    const history = useHistory();

    useEffect(()=>{
        if(!selectSelectimages){
            exit();
        }
    },[selectSelectimages]);
    const exit = () =>{
        history.replace("/chat");
    }
    return (
        <div className="chatview">
            {<img src={selectSelectimages} onClick={exit} alt="jp"/> }
            <div className="chatview__timer">

            <CountdownCircleTimer isPlaying
                duration={10}
                strokeWidth={4}
                size={50}
                colors={[
                    ['#004777',0.33],
                    ['#f78801',0.33],
                    ['#A30000',0.33]
                ]
                }
            >
                {({remainingTime})=>{
                    if(remainingTime==0){
                        exit();
                    }
                    return remainingTime;
                }}
            </CountdownCircleTimer>
            </div>
        </div>
    );
}

export default Chatview;