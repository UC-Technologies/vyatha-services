const User = require("../../../models/User");
const deleteAcc = async (email) => {
  // code here by neeraj
  try{
    await User.findByIdAndDelete({email: req.email});
  }catch(error){
    console.log(error);
  }


};

module.exports = { deleteAcc };
