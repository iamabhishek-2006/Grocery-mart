const express=require("express");
const { addToCart, getCart, updateCart, removeCart } = require("../../controllers/users/cart.controller");

const router=express.Router();

router.post("/add",addToCart);
router.get("/",getCart);
router.put("/:id",updateCart);
router.delete("/:id",removeCart);

module.exports=router;