const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv=require('dotenv').config()

const app = express()
const user=require('./routes/userRoutes')
const recruiter=require('./routes/recruiterRoutes')
const job=require('./routes/jobRoutes')
const chat=require('./routes/chatRoutes')
const message=require('./routes/messageRoutes')
require('./databaseConnect')
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors);
/*const whitelist = ["https://jobseeker-f7rl.onrender.com"];
const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200,
    credentials: true,
};
if (process.env.NODE_ENV === "development") {
    app.use(cors({ origin: true, credentials: true }));
} else {
    app.use(cors(corsOptions));
}*/

app.use('/user',user)
app.use('/recruiter',recruiter)
app.use('/job',job)
app.use('/chat',chat)
app.use('/message',message)
app.use((req, res, next) => {
    res.status(404).json({
        error: "route not found",
    });
});

const server=app.listen(process.env.PORT, () => console.log(`server listening on port ${process.env.PORT}`));

const io=require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:'http://localhost:3000'
    }
})
io.on('connection',(socket)=>{
    console.log('connected to socket.io')
    socket.on('new job application',(data)=>{
        socket.brodcast.emit('received notif',data)
    })    
})
