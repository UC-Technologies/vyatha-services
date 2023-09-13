
// require the UserModel
const express = require("express");
const signUp = require("../utils/SignUp");
const mail = require("../utils/EmailService");
const app = express();

const router = express.Router();
const SECRET = '@ucTechnologies'


app.use("/adminSignUp", signUp);
app.use("/mail", mail);


module.exports = router;







