// signup model goes here
const express= require('express');
const app= express();
const path= require('path');
const collection= require("mongoose");
const bcrypt= require("bcrypt");

app.use(express.json());

// app.get('/signup',(req,res)=>{
//     res.render([data]);
// })
const connectToDb = require("./DbConnection");

connectToDb()

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

SignUpSchema.pre('save',async function(next){
    if(this.isModified('password')){

        this.password= await bcrypt.hash(this.password, 12);
        this.confirmpassword= await bcrypt.hash(this.confirmpassword,12);
    }
    next();
});

const SignUp= new mongoose.model("MONGODBSECRET",SignUpSchema);

app.post("/signup",async(req,res)=>{
    try{

        const userExist= await SignUp.findOne({email: email});
        if(userExist){
            return res.status(422).json({error:"User already exists"});
        }

        const password= req.body.password;
        const cpassword= req.body.confirmpassword;

        if(password===cpassword){

            const studentSignUp= new SignUp({
                name: req.body.name,
                email: req.body.email,
                scholarID: req.body.scholarID,
                phone: req.body.phone,
                password: req.body.password,
                confirmpassword: req.body.password
            })


            const signedUp= await studentSignUp.save();
            res.status(201).render("index");
        }else{
            return res.status(422).json({error:"Password not matching"});
        }

       
    }catch(error){
        res.status(400).send(error);
    }
});