// signup and login authentication logic goes here
// require the UserModel

// const home = (req, res) => {
//   res.send("<p>Welcome to Vyatha api.</p>");
// };

// const signUp = async () => {};
// const logIn = async () => {};

// module.exports = {
//   home
// };

// userController.js

const User  = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose= require('mongoose');
const home = (req, res) => {
  res.send("<p>Welcome to Vyatha api.</p>");
};


const signUp = async () => {
  User.pre('save',async function (next) {
    if(this.isModified('password')){

        this.password= await bcrypt.hash(this.password, 10);
        this.confirmpassword= await bcrypt.hash(this.confirmpassword,10);
    }
    next();
  });


  const signup = async(req,res)=>{
      try{

          const userExist= await User.findOne({email: req.email});
          if(userExist){
              return res.status(400).json({error:"User already exists"});
          }

          const password= req.body.password;
          const cpassword= req.body.confirmpassword;

          if(password===cpassword){

              const studentSignUp= new User({
                  name: req.body.name,
                  email: req.body.email,
                  scholarID: req.body.scholarID,
                  phone: req.body.phone,
                  password: req.body.password,
                  confirmpassword: req.body.password
              })


              await studentSignUp.save();
              res.status(201).render("index");
          }else{
              return res.status(401).json({error:"Password not matching"});
          }

        
      }catch(error){
          res.status(400).send(error);
      }
  };
};

module.exports = {
  home,
  signUp
};

const studentLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, role: 'student' });

    if (!user) {
      return res.status(401).json({ error: "Please try with correct student credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ error: "Please try with correct student credentials" });
    }

    const expiresIn = 15 * 24 * 60 * 60; // 15 days in seconds

    const data = {
      user: {
        _id: user._id,
        email:user.email,
        role: 'student',
      },
    };
    const authtoken = jwt.sign(data, process.env.JWT_SECRET,{ expiresIn });

    res.status(200).json({ message: "Login successful", authtoken });
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal server error"});
  }
};

//Admin login


const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, role: 'admin' });

    if (!user) {
      return res.status(401).json({ error: "Please try with correct admin credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ error: "Please try with correct admin credentials" });
    }

    const expiresIn = 15 * 24 * 60 * 60;
    const data = {
      user: {
        _id: user._id,
        email: user.email,
        role: 'admin',
      },
    };
    const authtoken = jwt.sign(data, process.env.JWT_SECRET ,{ expiresIn } );

    res.status(200).json({ message: "Login succesful", authtoken });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = {
  home,
  studentLogin,
  adminLogin,
};

