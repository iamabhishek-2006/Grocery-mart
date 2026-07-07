const express=require("express");
const { getUsersbyAdmin, deleteUsersbyAdmin, getprofileAdmin } = require("../../controllers/admin/user.controller");
const authMiddleware=require("../../middleware/auth.middleware")
const router=express.Router();

router.get("/",getUsersbyAdmin);
router.get("/me",authMiddleware ,getprofileAdmin);
router.delete("/:id",deleteUsersbyAdmin);

module.exports=router;