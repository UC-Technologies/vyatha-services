const error = require("../../../utils/error/error");

const dashboardStudent = (req, res) => {
  const { user, exp } = req.user
  console.log(req.user);
  if( user.role === "student" && Date.now() < exp*1000) {
    return res.status(200).json({ message: 'Access granted' });
  } else {
    return res.status(401).json({ error: error.noAccess });
  }
};

module.exports = { dashboardStudent };
