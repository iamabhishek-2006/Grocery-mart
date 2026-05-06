const express=require("express");
const categoryRoutes=require("../../routes/admin/category.routes");
const productRoutes=require("../../routes/admin/product.routes");

const router=express.Router();

router.use("/category",categoryRoutes);
router.use("/product",productRoutes);


module.exports=router;