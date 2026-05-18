const express=require("express");
const { getUsersbyAdmin, deleteUsersbyAdmin } = require("../../controllers/admin/user.controller");

const router=express.Router();

router.get("/",getUsersbyAdmin);
router.delete("/:id",deleteUsersbyAdmin);

module.exports=router;