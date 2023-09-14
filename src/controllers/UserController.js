
// require the UserModel
const express = require("express");
const mail = require("../utils/EmailService");
const app = express();


const  jwt  = require("jsonwebtoken");
const  bcrypt  = require("bcrypt");
const Admin = require("../models/Admin");



const home = (req, res) => {
  res.send("<p>Welcome to Vyatha api.</p>");
};







 //Sign Up for Admin
const adminSignUp = async (req, res) => {
 
  //check whether the user with this email exists already or not
  try{
    let user = await Admin.findOne({email: req.body.email})
  if(user){
    return res.status(400).json({erorr: "Sorry a user with this email already exists"});
  }
 
  //if everthing goes right then user is created and saved in Database
 
  if(req.body.password!== req.body.confirmPass){
   return res.json({error: "Password didn't match"});
  }

  //using hashing and salting using bcrypt

  const salt = await bcrypt.genSalt(10);
  const Hashpass = await bcrypt.hash(req.body.password , salt);
 
  user = await Admin.create({
    name: req.body.name,
    password: Hashpass,
    phoneNo : req.body.phone,
    email: req.body.email,
    designation: req.body.designation,
  });
  
  const data = {
    user : {
      id: user.id,
    }
  };
 
  const authToken = jwt.sign(data, process.env.JWT_SECRET);
  res.status(201).json({"auth-token" : authToken});
  }
  catch(error){
    return res.status(500).json({error : error.message});
  }

};








const logIn = async () => {};





module.exports = {
  home,
  adminSignUp
};






