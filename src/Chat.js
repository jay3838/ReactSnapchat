import React, { useEffect ,useState } from 'react';
import Searchicon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import Chatbubbleicon from '@material-ui/icons/ChatBubble';
import './Chat.css';
import {db,auth} from './Firebase';
import Chats from './Chats';
import {selectuser,resetimage} from './userSlice';
import { useSelector } from 'react-redux';
import Radiobutton from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

function Chat() {
    const [post,setposts] = useState([]);
    const dispatch = useDispatch(); 
    const user = useSelector(selectuser);
    const history = useHistory();


    useEffect(()=>{
        db.collection('posts').orderBy('timestamp','desc').onSnapshot((snapshot)=>{
            setposts(
                snapshot.docs.map((doc)=>({
                    id:doc.id,
                    data:doc.data(),
                }))
            )
        })

    },[])

    const takeSnap = ()=>{
        dispatch(resetimage())
        history.push("/");
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar  src={user.profilePic} onClick={()=>{auth.signOut()}} className="chat__avatar"/>
                 <div className="chat__search">
                    <Searchicon/>
                    <input placeholder="Friends" type="text" />
                </div>
                <Chatbubbleicon className="chat__chaticon"/>            
            </div>
            <div className="chat__posts">
                {post.map(
                    ({
                        id,
                        data:{profilePic,username,timestamp,
                imageUrl,read},
            }) =>(
                    <Chats key={id}
                    id={id}
                    username={username}
                    timestamp={timestamp}
                    imageUrl={imageUrl}
                    read={read}
                    profilePic={profilePic}

                     />
                )
                )}
            </div>
            <Radiobutton className="chat__take" 
            onClick={takeSnap} fontSize="large"/>

        </div>
    );
}

export default Chat;