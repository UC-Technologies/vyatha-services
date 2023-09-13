
const PORT = process.env.PORT || 8787;
require("dotenv").config();
const express = require("express");
const app = express();
const userController = require("./src/controllers/UserController");
const connectToDB = require("./src/db/DbConnection");
app.use(express.json());


app.get("/", (req, res)=>{
  res.send("Hello");
});


//connectToDB();

app.use("/vyatha/api", userController);
app.use("/vyatha/api", userController);

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});