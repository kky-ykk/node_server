
const app=require("express");
const Menu=require("./../models/Menu");

const route=app.Router();

route.post("/",async (req,res)=>{
    try{
        const data = req.body;

        const newMenu = new Menu(data);

        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});

route.get("/",async (req,res)=>{

    try{
        let datas=await Menu.find();
        
        console.log(datas);

        res.status(200).json(datas);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }

});

route.get("/:taste",async (req,res)=>{
    try{

        const taste=req.params.taste;

        if(taste=="spicy" || taste=="sour" || taste=="sweet"){

            const response=await Menu.find({taste:taste});

            res.status(200).json(response);

        }else       
            res.status(400).json({err:"invalid taste type!"});

    }catch(err){
        res.status(500).json({err:"Server sidded error!"});
    }
});

module.exports=route;