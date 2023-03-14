const express = require('express');
const router = express.Router();
const {register, login, profile, processRegister, processLogin} = require("../controllers/userController");
const registerUserValidation = require('../validations/registerUserValidation');
const loginUserValidation = require("../validations/loginUserValidaation")

/* /users */
router.get("/register", register);
router.post("/register", registerUserValidation, processRegister)
router.get("/login", login);
router.post("/login", loginUserValidation, processLogin)
router.get("/profile", profile);
router.put("/profile", profile);



module.exports = router;