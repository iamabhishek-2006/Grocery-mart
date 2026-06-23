const express=require("express");
const { createProduct, updateProduct, deleteProduct, getProduct } = require("../../controllers/admin/product.controllers");

const router=express.Router();

router.post("/add",createProduct);
router.get("/",getProduct);
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);

module.exports=router;
