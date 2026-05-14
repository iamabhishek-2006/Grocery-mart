const Order=require("../../models/order")

const getOrdersByAdminDB=async()=>{
    const orders = await Order.find().populate("user", "name email").populate("shippingAddress").sort({ createdAt: -1 });
    return orders;
}

module.exports={getOrdersByAdminDB};