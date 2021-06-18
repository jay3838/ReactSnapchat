import './App.css';
import Webcamcapture from './Webcamcapture';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Preview  from './Preview';
import Chat from './Chat';
import Chatview  from './Chatview';
import Login from './Login';
import { useDispatch,useSelector } from 'react-redux';
import {login, logout, selectuser} from './userSlice';
import { useEffect } from 'react';
import { auth } from './Firebase';


function App() {
  const user = useSelector(selectuser);
  const dispatch = useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged((authnm)=>{
      // console.log("ap",authnm);
      if(authnm){
        dispatch(login({
          username:authnm.displayName,
          profilePic:authnm.photoURL,
          id:authnm.uid
        }))
      }
      else{
        dispatch(logout());
      }
    })
  })
  // console.log('hey',user);

  return (
    <div className="app">
     <Router>
       {
         !user ? (
           <Login/>
         ):(
          <div className="app__body">
            <div className="app__bodybackground">
            <Switch>
            <Route path="/chat/view">
              <Chatview />
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
            <Route path="/preview">
              <Preview />
            </Route>
            <Route path="/">
               <Webcamcapture/>
            </Route>
          </Switch>
            </div>
        </div>       
         )
         
       }
     </Router>
    </div>
  );
}

export default App;
