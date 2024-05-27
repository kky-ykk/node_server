const express=require('express');

const db=require("./db");
const Menu=require("./models/Menu");

let app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.json());     // req.body

app.get("/",function(req,res) {
    res.send("Hello from server!, I am Alive!");
})

// using router manu
const menu=require("./route/routerMenu");

app.use("/menu",menu);


app.listen(3000,()=>{
    console.log("server is listending on port :",3000);
});