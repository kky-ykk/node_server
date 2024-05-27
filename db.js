
const mongoose = require('mongoose');
require("dotenv").config();

//mongodb url
// const mongoURL="mongodb://localhost:27017/student";
// const mongoURL="mongodb+srv://kishan:Root123@cluster0.uz4q9g0.mongodb.net/";


// const MONGODB_LOCAL=process.env.MONGODB_URL_LOCAL;
const MONGODB_REMOTE=process.env.MONGODB_URL_REMOTE;

//set up mongoDB connection
mongoose.connect(MONGODB_REMOTE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//get the default connetion
//moongoose maintain a default connection object representing the mongoDB connection.
const db = mongoose.connection;

//define event listeners for database connection

db.on('connected',()=>{
    console.log("connected to mongoDB server");
});

db.on('error',(err)=>{
    console.error("mongoDB connection error",err);
});

db.on('disconnected',()=>{
    console.log("mongoDB disconnected!");
})

//export database connections
module.exports=db;

