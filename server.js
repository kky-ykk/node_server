const express=require('express');
const db=require("./db");

require("dotenv").config();

const Person=require("./models/person");

let app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.json());                             // req.body

app.get("/",function(req,res) {
    res.send("Hello from server!, I am Alive!");
});

//--------- using async to handle post
app.post('/person',async (req,res)=>{
    try{
        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});


//---------- using router or we can use above one which is not using router
const route=require("./route/routerPerson");

app.use("/person",route);


const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log("server is listending on port :",4000);
});