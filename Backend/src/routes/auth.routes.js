const express=require("express");
const { signUp, login, logout } = require("../controllers/auth.controller");
const { loginLimiter } = require("../middleware/ratelimit");

const router=express.Router();

router.post("/register",signUp);
router.post("/login",loginLimiter,login);
router.post("/logout",logout);

module.exports=router;



