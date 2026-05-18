const Order=require("../../models/order")

// const getOrdersByAdminDB=async()=>{
//     const orders = await Order.find().populate("user", "name email").populate("shippingAddress").sort({ createdAt: -1 });
//     return orders;
// }

const getOrdersByAdminDB = async (filter) => {
  const orders = await Order.find(filter)
    .populate("user", "name email").populate("shippingAddress")
    .sort({ createdAt: -1 });
  return orders;
};

const updateOrderStatusDB = async (id, orderStatus) => {
  return await Order.findByIdAndUpdate(
    id,
    { orderStatus },
    { returnDocument: "after" },
  );
};

module.exports={getOrdersByAdminDB,updateOrderStatusDB};