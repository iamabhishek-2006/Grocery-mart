const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
   user: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true,  } ,
   paymentMethod: { type: String,enum: ["COD", "Online"]  }  ,
   totalAmount: {type: Number,    required: true,  }  ,
   paymentStatus: {type: String, enum: ["pending", "success", "failed"],default: "pending",  } ,
   paymentDetails: { 
   razorpay_order_id: {type: String},
   razorpay_payment_id: {type: String},  
   razorpay_signature: { type: String},
   paidAt: {type: Date,}} ,
   shippingAddress: {type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true} ,
   items: [
    {
       product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true,}  ,
       quantity: {type: Number,required: true,min: 1}   ,
      //  price: {type: Number,required: true }, 
    }
    ] ,
   orderStatus: {type: String,enum: ["processing", "shipped", "delivered", "cancelled"], default: "processing"},
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", OrderSchema);
module.exports=Order