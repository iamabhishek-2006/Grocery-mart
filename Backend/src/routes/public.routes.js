const express=require("express");
const { getProducts, getCategories, getProductsbySlug, getProductbyCategories } = require("../controllers/public.controller");

const router=express.Router();

router.get("/product",getProducts);
router.get("/category",getCategories);
router.get("/product/:slug",getProductsbySlug);
router.get("/products/:category", getProductbyCategories);

module.exports=router;