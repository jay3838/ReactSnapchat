import React, { useEffect } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { resetCameraImage,selectcameraImage} from './cameraSlice';
import { useHistory } from 'react-router';
import Closeicon from '@material-ui/icons/Close';
import './Preview.css';
import Textfeildicon from '@material-ui/icons/TextFields';
import Createicon from '@material-ui/icons/Create';
import Noteicon from '@material-ui/icons/Note';
import Musicicon from '@material-ui/icons/MusicNote';
import Attachefileicon from '@material-ui/icons/AttachFile';
import Cropicon from '@material-ui/icons/Crop';
import Timeicon from '@material-ui/icons/Timeline';
import Sendicon from '@material-ui/icons/Send';
import firebase from 'firebase';
import {db,storage} from './Firebase';
import { v4 as uuid} from 'uuid';




function Preview() {
    const history = useHistory();
    const photo = useSelector(selectcameraImage);
    const dispatch = useDispatch(); 

   useEffect(()=>{
        if(!photo){
            history.replace("/");
        }
    },[photo,history]);
    
    const close =()=>{
        dispatch(resetCameraImage());
        history.replace("/");

   }
   const sendPost = () =>{
       const id = uuid();
       const uploadTask = storage.ref(`posts/${id}`).putString(photo,"data_url");

        uploadTask.on('state_changed', null,(error)=>{
            console.log(error);
        },
        ()=>{
            storage.ref('posts').child(id).getDownloadURL().then((url)=>{
                db.collection('posts').add({
                    imageUrl: url,
                    username:'dp',
                    read:false,
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                });
                history.push('/chat');
            });
            
   }

);
}

    return (
        <div className="preview">
            <Closeicon onClick={close} className="preview__close"/>
            <div className="preview__toolbarright">
                <Textfeildicon/>
                <Createicon/>
                <Noteicon/>
                <Musicicon/>
                <Attachefileicon/>
                <Cropicon/>
                <Timeicon/>
            </div>
            <img src={photo} alt="jp"/>
            <div className="preview__footer">
                <h2>Send Now</h2>
                <Sendicon  onClick={sendPost} fontSize="small" className="preview__sendicon"/>
            </div>
        </div>
    );
}

export default Preview;