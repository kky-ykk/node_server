
const express=require('express');
const route=express.Router();

const Person=require("../models/person");

route.get("/:workType",async (req,res)=>{
    
    try{
        
        const workType=req.params.workType;

        if(workType=="chef" || workType=="manager" || workType=="waiter"){
            const response=await Person.find({work:workType});
            res.status(200).json(response);
        }else{                                                                          // when wrong worktype is given
            res.status(400).json({err:"invalid work type"});
        }
        
    }catch(err){
        res.status(500).json({err:"server side error!"});
    }

});

route.get("/",async (req,res)=>{
    
    try{
        const data=await Person.find();

        console.log('data displayed!');

        res.status(200).json(data);
    }catch(err){                                
        console.log(err);
        res.status(500).json({error:'Internal server error'});     
    }

});


//------------------------ udpating record of collections
route.put("/:id",async (req,res)=>{
    try{

        const id=req.params.id;
        const dataToUpdate=req.body;
        console.log("here,...");
        const response=await Person.findByIdAndUpdate(id,dataToUpdate,{
            new:true,            //return the updated document
            runValidators:true,    //run mongoose validatoin
        });
        
        if(!response){
            return res.status(400).json({error:"Person not found!"});
        }

        console.log("data updated!");
        res.status(200).json(response);


    }catch(err){
        res.status(500).json({err:"invalid server side!"});
    }
});

//------------------------------- deleting record from colletions
// route.delete("/:id",async (req,res)=>{
//     try{
        
//         const id=req.params.id;
        
//         const response=await Person.findOneAndDelete(id);
        
//         console.log(response);

//         res.status(200).json(response);

//     }catch(err){
//         res.status(500).json({err:"server side error!"});
//     }
// })


module.exports=route;
