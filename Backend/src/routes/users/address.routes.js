const express=require("express");
const { addAddress, getAddress, updateAddress, removeAddress } = require("../../controllers/users/address.controller");

const router=express.Router();

router.post("/add",addAddress);
router.get("/",getAddress);
router.put("/:id",updateAddress);
router.delete("/:id",removeAddress);

module.exports=router;