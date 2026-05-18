const { getOrdersByAdminDB, updateOrderStatusDB } = require("../../services/admin/order.service");

// const getOrdersByAdmin = async (req, res) => {
//   try {
//     const data = await getOrdersByAdminDB();
//     return res.status(200).json({
//       success: true,
//       message: "admin get Orders successfully",
//       data: data,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// controllers/admin/orderController.js

const getOrdersByAdmin = async (req, res) => {
  const { paymentMethod } = req.query;

  try {
    let filter = {};
    // filter by payment method
    if (paymentMethod) {
      filter.paymentMethod = paymentMethod;
    }

    const data = await getOrdersByAdminDB(filter);
    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateStatusOrder=async(req,res)=>{
    const {id}=req.params;
    const { orderStatus}=req.body;

    try {
    const data = await updateOrderStatusDB(id, orderStatus);
    return res.json({ success: true, data });
    } catch (error) {
    console.log(error);
    return res.json({
      success:false,
      error:error.error
    });
    }
}

module.exports = { getOrdersByAdmin, updateStatusOrder };
