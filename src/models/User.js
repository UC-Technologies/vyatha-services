// signup model goes here

const express= require('express');
const app= express();
const mongoose= require("mongoose");


app.use(express.json());

const SignUpSchema= new mongoose.Schema({
    name:{
        type:String,    
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    scholarID:{
        type:Number,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model('User', SignUpSchema);