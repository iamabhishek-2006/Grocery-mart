const express=require("express");
const cartRoutes=require("./cart.routes");
const authMiddleware = require("../../middleware/auth.middleware");

const router=express.Router();

router.use("/cart",cartRoutes);
router.use("/address", authMiddleware, require("./address.routes"));
router.use("/order",authMiddleware,require("./order.routes"));


module.exports=router;