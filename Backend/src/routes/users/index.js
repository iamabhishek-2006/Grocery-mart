const express=require("express");
const cartRoutes=require("./cart.routes");

const router=express.Router();

router.use("/cart",cartRoutes);
router.use("/address",require("./address.routes"))


module.exports=router;