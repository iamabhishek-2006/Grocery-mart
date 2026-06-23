const express=require("express");
const categoryRoutes=require("../../routes/admin/category.routes");
const productRoutes=require("../../routes/admin/product.routes");
const UserRoutes=require("../../routes/admin/user.routes");
const orderRoutes=require("../../routes/admin/oders.routes")

const router=express.Router();

router.use("/category",categoryRoutes);
router.use("/product",productRoutes);
router.use("/user",UserRoutes);
router.use("/order",orderRoutes);

module.exports=router;