const express=require("express");
const { createProduct, updateProduct, deleteProduct, getProduct, getProductbySlug, addProductImagebyMulter, deleteProductImage } = require("../../controllers/admin/product.controllers");
const upload = require("../../middleware/multer");

const router=express.Router();

router.post("/add",createProduct);
router.post("/images", upload.array("images", 5), addProductImagebyMulter);
router.get("/",getProduct);
router.get("/:slug", getProductbySlug);
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);
router.delete("/image/:id",deleteProductImage);

module.exports=router;
