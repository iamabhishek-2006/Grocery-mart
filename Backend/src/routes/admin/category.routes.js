const express=require("express");
const { createCategory, updateCategory, deleteCategory, getCategory } = require("../../controllers/admin/category.controller");

const router=express.Router();

router.post("/",createCategory);
router.get("/get",getCategory);
router.put("/:id",updateCategory);
router.delete("/:id",deleteCategory);

module.exports=router;