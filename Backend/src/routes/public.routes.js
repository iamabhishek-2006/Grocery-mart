const express=require("express");
const { getProduct } = require("../controllers/admin/product.controllers");
const { getCategories } = require("../controllers/public.category");


const router=express.Router();

router.get("/product",getProduct);
router.get("/category",getCategories);

module.exports=router;