

const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const app = express();
const email = require("../utils/EmailService")

router.get('/', userController.home);
router.post('/vyatha/api/adminSignUp', userController.adminSignUp);
app.use("/vyatha/api", email);


module.exports = router;