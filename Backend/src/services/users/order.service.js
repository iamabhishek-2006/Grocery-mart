const Order = require("../../models/order");
const Product = require("../../models/product");
const User=require("../../models/user");

const placeOrderCODService = async (userId, paymentMethod,totalAmount,shippingAddress,items) => {
   
  if (!shippingAddress || !items || items.length === 0) {
    throw new Error("Invalid data");
  }

    // calculate Amount Using Items
    let amount=await items.reduce(async(acc,item)=>{
      const product=await Product.findById(item.product);
      return  (await acc) + product.price * item.quantity;
    },0)
  
    // Add Tax Charge (2%);
    amount +=Math.floor(amount*0.02);
  
    const order = await Order.create( {user:userId , paymentMethod: "COD",totalAmount:amount,paymentStatus: "pending",shippingAddress,items});
    return order;
};

const getOrderDB=async(id)=>{
  const data=await Order.find({user:id}).populate({path:"items.product"}).populate("shippingAddress");
  return data;
};

const getUserOrderDetailsDB = async (user) => {

  if (!user) {
    throw new Error("User id is required");
  }
  // check user exists
  const userExist = await User.findById(user);

  if (!userExist) {
    throw new Error("User not found");
  }
  const data = await Order.find({user,paymentMethod: "COD",paymentStatus: "pending"}).populate("items.product").populate("shippingAddress user");

  if (data.length === 0) {
    throw new Error("No orders found");
  }

  return data;
};


const placeOrderOnlineDB = async (user,paymentMethod,totalAmount,paymentDetails,shippingAddress,items) => {

  if (!user || !shippingAddress || !items || items.length === 0) {
    throw new Error("Invalid data");
  }

  const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = paymentDetails;

  if (!razorpay_order_id ||!razorpay_payment_id ||!razorpay_signature) {
    throw new Error("Payment details required");
  }

  // calculate total amount
  let amount = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);

    if (!product) {
      throw new Error("Product not found");
    }
    amount += product.price * item.quantity;
  }

  const order = await Order.create({user,paymentMethod: "Online",totalAmount: amount,paymentStatus: "success", paymentDetails: {razorpay_order_id,razorpay_payment_id,razorpay_signature,paidAt: new Date(), },shippingAddress,items});
  return order;
};

const cancelOrderDB=async(id)=>{
  return await Order.findByIdAndDelete(id ,{orderStatus:"cancelled"} , {returnDocument:"after"});
}

module.exports = { placeOrderCODService,getUserOrderDetailsDB , placeOrderOnlineDB , getOrderDB,cancelOrderDB};