const express=require("express");
const { getOrdersByAdmin } = require("../../controllers/admin/order.controller");

const router=express.Router();

router.get("/", getOrdersByAdmin);

module.exports=router;