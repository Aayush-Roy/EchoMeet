import { Button, Input, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client";

const server_url = 'http://localhost:8080';
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
  },)

  let getMedia = ()=>{
    setVideo(videoAvailable);
    setAudio(audioAvailable);
    connectToSocketServer();
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
  let gotMessagesFromServer =()=>{

  }

  let addMessage =()=>{

  }
  let connectToSocketServer =()=>{
    socketRef.current = io.connect(server_url,{secure:false});

      // socketRef.current = io(server_url, { transports: ["websocket", "polling"] });
    socketRef.current.on("signal",gotMessageFromServer);
    socketRef.current.on("connect",()=>{
      socketRef.current.emit("join-call",window.location.href);
      socketIdRef.current = socketRef.current.id;
      socketRef.current.on("chat-message",addMessage);
      socketIdRef.current.on("user-left",(id)=>{
         setVideos((videos)=>videos.filter((video)=>video.socketId!==id));
         socketIdRef.current.on("user-joines",(id,clients)=>{
          clients.forEach((socketListId)=>{
            connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
            connections[socketListId].onicecandidate=(event)=>{
              if(event.candidate!==null){
                socketRef.current.emit("signal",socketListId,JSON.stringify({'ice':event.candidate}))
              }
            } 
            connections[socketListId].onaddstream=(event)=>{
              let videoExists = videoRef.current.find(video=>video.socketId === socketListId);
              if(videoExists){
                setVideos(videos=>{
                  const updateVideos = videos.map(video=>video.socketId === socketListId ? {...video,stream:event.stream}:video);
                  videoRef.current = updateVideos;
                  return updateVideos;
                })
              }else{
                let newVideo = {
                  socketId: socketListId,
                  stream: event.stream,
                  autoPlay:true,
                  playsinline: true
                }
                setVideos(videos=>{
                  const updatedVideos =[...video,newVideo];
                  videoRef.current = updatedVideos;
                  return updatedVideos;
                }); 
              }
            };

            if(window.localStream!==undefined && window.localStream!==null){
              connections[socketListId].addStream(window.localStream);
            }else{
              // let blackSilence = 
            }
          })

          if(id===socketIdRef.current){
            for(let id2 in connections){
              if(id2 === socketIdRef.current) continue;
              try{
                connections[id2].addStream(window.localStream)
              }catch(e){
                connections[id2].createOffer().then((description)=>{
                  connections[id2].setLocalDescription(description).then(()=>{
                    socketRef.current.emit("signal",id2,JSON.stringify({'sdp':connections[id2].LocalDescription}));
                  })
                 
                })
              }
            }
          }

         })
      })
    })
  
  }

  let connect = ()=>{
    setAskForUsername(false);
    getMedia(); 
  }

  return (
    <div>
      {askForUsername === true ? 
      <div>
        <h2>Enter Into Lobby</h2>
       
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
