import { Server } from "socket.io";
let connections = {};
let messages = {};
let timeOnline = {}

export const connectToSocket =(server)=>{
    const io = new Server(server);

    io.on("connection",(socket)=>{
        socket.on("join-call",(path)=>{
          if(connections[path]===undefined){
            connections[path] = [];
          }
          connections[path].push(socket.id);
          timeOnline[socket.id] = new Date();

          for(let a=0; a<connections[path].length; a++){
            io.to(connections[path][a]).emit("user-joined",socket.id,connections[path])
          }

          if(messages[path]!==undefined){
            for(let a=0; a<messages[path].length; a++){
                io.to(socket.id).emit("chat-message",messages[path][a]['data'],
                    messages[path][a]['sender'],messages[path][a]['socket-id-sender']
                )
            }
          }

        })

        socket.on("signal",(toId,message)=>{
            io.to(toId).emit("signal",socket.id,message)
        })

        socket.on("chat-message",(data,sender)=>{

        })

        socket.on("disconnect",()=>{

        })
    })

    return io;
}