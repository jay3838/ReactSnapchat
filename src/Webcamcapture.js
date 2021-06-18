import React,{useCallback, useRef} from 'react';
import './Webcamcapture.css';
import Webcam from 'react-webcam';
import Radiobutton from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import {setCameraImage} from './cameraSlice';
import { useHistory } from 'react-router';


const videocn = {
    width:250,
    height:400,
    facingMode:"user"
}
function Webcamcapture() {


  const history = useHistory();
    const webcamref= useRef((null));
    const dispatch = useDispatch(); 



  const capture = useCallback(()=>{

    const imagesrc = webcamref.current.getScreenshot();
    // console.log(imagesrc); 
    dispatch(setCameraImage(imagesrc));
    history.push('/preview');
    
  },[webcamref])



    return (
        <div>
           
            <Webcam className="webcamcapture"
            audio={false}
            height={videocn.height}
            ref={webcamref}
            screenshotFormat='image/jpeg'
            width={videocn.width}
            videoConstraints={videocn}
            />

            <Radiobutton className="webcamcapture__button" 
            onClick={capture}/>


         
        </div>
    );
}

export default Webcamcapture;