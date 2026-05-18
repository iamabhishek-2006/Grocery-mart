const express=require("express");
const { getOrdersByAdmin, updateStatusOrder } = require("../../controllers/admin/order.controller");

const router=express.Router();

router.get("/", getOrdersByAdmin);
router.put("/:id", updateStatusOrder);

module.exports=router;