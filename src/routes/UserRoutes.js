const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/', userController.home);
router.post("/signup", userController.signUp);

router.post('/studentLogin', userController.studentLogin);
router.post('/adminLogin', userController.adminLogin);

module.exports = router;