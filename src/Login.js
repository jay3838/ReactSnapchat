import React from 'react';
import { useDispatch } from 'react-redux';
import { auth ,provider} from './Firebase';
import {Button} from '@material-ui/core';
import {login} from './userSlice';

function Login() {
    const dispatch = useDispatch();

    const signin = ()=>{
        auth.signInWithPopup(provider).then((result)=>{
            // console.log("hey",result);
            dispatch(
                login({
                    username:result.user.displayName,
                    profilePic:result.user.photoURL,
                    id:result.user.uid,
                })
            )
        })
        .catch((error)=>alert(error.message));
    }
    return (
        <div className="login">
           <Button  varianet="outline" onClick={signin}>Sign in</Button>
        </div>
    );
}

export default Login;