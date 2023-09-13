// signup model goes here
const express= require('express');
const app= express();
const path= require('path');
const collection= require("mongoose");
app.use(express.json());
app.get('/signup',(req,res)=>{
    res.render([data]);
})

app.post("/signup",async(req,res)=>{
    const data={
        name: req.body.name,
        scholarID: req.body.scholarID,
        password: req.body.password,
        phone: req.body.phone,
        email: req.body.email
    }
    await collection.insertMany([data]);

    res.json({
        message:"posted successfully"
    });
});

app.listen(3000,()=>{
    console.log("port connected");
})

