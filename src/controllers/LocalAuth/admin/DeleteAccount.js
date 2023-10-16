const Admin = require("../../../models/Admin");
const deleteAccAdmin = async (email) => {
  // code here by neeraj
  try{
    await Admin.findByIdAndDelete({email: req.email});
  }catch(error){
    console.log(error);
  }
};
module.exports = { deleteAccAdmin };
