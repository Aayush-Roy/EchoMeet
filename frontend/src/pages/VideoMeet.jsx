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


  }catch{

  }
}

  useEffect(()=>{
    getPermission();
  },[])
  return (
    <div>
      {askForUsername === true ? 
      <div>
        <h2>Enter Into Lobby</h2>
        {username}
        <TextField id='outlined-basic' label="Username" value={username} onChange={e=>setUsername(e.target.value)}/>
          <Button variant='contained'>Connect</Button>

        <div>
          <video ref={localVideoRef} autoPlay muted></video>
        </div>

      </div>:<></>  
    }  
    </div>
  )
}

export default VideoMeet;
