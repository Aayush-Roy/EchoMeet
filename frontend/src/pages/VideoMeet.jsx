import { Button, Input, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
const server_url = 'http://localhost:8000';
let connections = {};

const peerConfigConnections = {
    "iceServers":[
        {"urls":"stun:stun1.l.google.com:19302"}
    ]
};


const VideoMeet = () => {
  let socketRef = useRef();
  let socketIdRef = useRef();
  let localVideoRef = useRef();
  let [videoAvailable,setVideoAvailable] = useState(true);
  let[audioAvailable,setAudioAvailable] = useState(true);
  let[video,setVideo] = useState();
  let[audio,setAudio] = useState();
  let[screen,setScreen] = useState();
  let[showModal,setShowModal] = useState();
  let[scrrenAvailable,setScreenAvailable] = useState();
  let[messages,setMessages] = useState([]);
  let[message,setMessage] = useState("");
  let[newMessage,setNewMessage] = useState(0);
  let[askForUsername,setAskForUsername]=useState(true);
  let[username,setUsername]=useState("");
  const videoRef = useRef([]);
  let[videos,setVideos] = useState([]);

const getPermission =async()=>{
  try{
      const videoPermission = await navigator.mediaDevices.getUserMedia({video:true}); 
      if(videoPermission){
        setVideoAvailable(true);
      }else{
        setVideoAvailable(false);
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({audio:true}); 
      if(audioPermission){
        setAudioAvailable(true);
      }else{
        setAudioAvailable(false);
      }

      if(navigator.mediaDevices.getDisplayMedia){
        setScreenAvailable(true);
      }else{
        setScreenAvailable(false);
      }

      if(videoAvailable || audioAvailable){
        const userMediaStream = await navigator.mediaDevices.getUserMedia({video:videoAvailable, audio:audioAvailable});
        if(userMediaStream){
          window.localStream = userMediaStream;
          if(localVideoRef.current){
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }

      

  }catch(err){
    console.log(err);
  }
}

  

  useEffect(()=>{
    getPermission();
  },[])

  let getMedia = ()=>{
    setVideo(videoAvailable);
    setAudio(audioAvailable);
    // connectToSocketServer();
  }

  let getUserMediaSuccess =()=>{

  }

  let getUserMedia =()=>{
    if((video && videoAvailable)||(audio && audioAvailable)){
      navigator.mediaDevices.getUserMedia({video:video,audio:audio})
      .then(getUserMediaSuccess)
      .then((stream)=>{})
      .catch((e)=>console.log(e));
    }else{
      try{
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach((track)=>track.stop());
      }catch(e){}
    }
  }

  useEffect(()=>{
    if(video!==undefined && audio!==undefined){
      getUserMedia();
    }
  },[audio,video])

  let connect = ()=>{
    setAskForUsername(false);
    getMedia(); 
  }

  return (
    <div>
      {askForUsername === true ? 
      <div>
        <h2>Enter Into Lobby</h2>
        {username}
        <TextField id='outlined-basic' label="Username" value={username} onChange={e=>setUsername(e.target.value)}/>
          <Button variant='contained' onClick={connect} >Connect</Button>

        <div>
          <video ref={localVideoRef} autoPlay muted></video>
        </div>

      </div>:<></>  
    }  
    </div>
  )
}

export default VideoMeet;
