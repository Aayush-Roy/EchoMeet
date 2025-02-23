import express from 'express';
import {createServer} from "node:http";

import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from './controllers/socketManager.js';
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port",(process.env.PORT || 8080));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users",userRoutes)

app.get("/home",(req,res)=>{
    return res.json({"hellow":"world"});
})

const start = async()=>{
    const connectDb = await mongoose.connect("mongodb+srv://ar0671362:XTK6zmN83rQCUrME@cluster0.v421m.mongodb.net/")
    console.log(`MONGO CONNECTED DB HOST: ${connectDb.connection.host}`)
    app.listen(app.get("port"),()=>{
        console.log("Listening on port 8080");
    })
}

start();