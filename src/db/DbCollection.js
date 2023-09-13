//Db Collections come here
const mongoose= require("mongoose");
const connectToDb = require("./DbConnection");

connectToDb()

const SignUpSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    scholarID:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection= new mongoose.model('SignUpCollection',SignUpSchema);
module.exports= collection; 