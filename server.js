const express=require('express');
const db=require("./db");

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

app.listen(3000,()=>{
    console.log("server is listending on port :",3000);
});