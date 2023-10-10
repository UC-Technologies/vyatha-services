// signup and login authentication logic goes here
// require the UserModel

const home = (req, res) => {
  res.send("<p>Welcome to Vyatha api.</p>");
};

const signUp = async () => {
  SignUpSchema.pre('save',async function(next){
    if(this.isModified('password')){

        this.password= await bcrypt.hash(this.password, 10);
        this.confirmpassword= await bcrypt.hash(this.confirmpassword,10);
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
              return res.status(401).json({error:"Password not matching"});
          }

        
      }catch(error){
          res.status(400).send(error);
      }
  });
};
const logIn = async () => {};

module.exports = {
  home,
  signUp
};