const { placeOrderCODService, getUserOrderDetailsDB, placeOrderOnlineDB, getOrderDB, cancelOrderDB,   } = require("../../services/users/order.service");

// order on cash on delivery

const placeOrderbyCOD = async (req, res) => {
  const user=req.user.id;
  const {  paymentMethod, totalAmount,shippingAddress, items } = req.body;
 
  try {
    const data = await placeOrderCODService(user, paymentMethod, totalAmount,shippingAddress,items);
    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: data,
    });
  } catch (error) {
    console.log(error, "somethong went wrong");
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// get Order

const getOrder=async(req,res)=>{
  const user=req.user.id;
  const data=await getOrderDB(user);
  return res.json({success:true,data:data
  });
}

const getUserOrderDetails = async (req, res) => {
  const user=req.user.id;
  
  try {
    const data = await getUserOrderDetailsDB(user);
    return res.status(200).json({
      success: true,
      message: "order get successfully",
      data:data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// order api of Online payment or UPI
const placeOrderbyOnline = async (req, res) => {
  const user=req.user.id;
  
  const {paymentMethod,totalAmount,paymentDetails,shippingAddress,items} = req.body;

  try {
    const data = await placeOrderOnlineDB(user,paymentMethod,totalAmount,paymentDetails,shippingAddress,items);
    return res.status(201).json({
      success: true,
      message: "Online order placed successfully",
      data:data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const cancelOrder=async(req,res)=>{
  const {id} = req.params;
  console.log(id);
  try {
  const data=await cancelOrderDB(id);
  return res.status(200).json({
    success:true,
    message:"cancel  Order successfully",
  })
  } catch (error) {
  console.log(error);
  return res.status(500).json({
    success:false,
    error:error.message
  });
  }
};


module.exports = { placeOrderbyCOD, placeOrderbyOnline, getUserOrderDetails,getOrder,cancelOrder };
