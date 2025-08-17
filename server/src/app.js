import express from 'express'
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin:process.env.CLIENT_URL || "*",
    credentials:true
}))

app.use(express.json({
    limit:"16kb"
}));

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

import authRoutes from './routes/authRoutes.js';
app.use('/api/auth', authRoutes);


import chatRoutes from './routes/chatRoutes.js';
app.use('/api/chat',chatRoutes);




export {app}