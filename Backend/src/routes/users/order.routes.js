const express = require("express");
const { placeOrderbyCOD, placeOrderbyOnline, getUserOrderDetails, getOrder, cancelOrder } = require("../../controllers/users/order.controller");

const router = express.Router();

router.post("/cod", placeOrderbyCOD);
router.post("/Online",placeOrderbyOnline)
router.get("/getDetail",getUserOrderDetails);
router.get("/getOrder", getOrder);
router.put("/:id",cancelOrder)

module.exports = router;
