
const mongoose = require('mongoose');

//mongodb url
const mongoURL="mongodb://localhost:27017/student";


//set up mongoDB connection
mongoose.connect(mongoURL,{
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

