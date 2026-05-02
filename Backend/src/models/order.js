const mongoose=require("mongoose");

const OrderSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    paymentMethod:{type:String,required:true,enum:["COD","Online"]},
    totalAmount:{type:Number,required:true},
    paymentStatus:{type:String,enum:["success","failed","pending",],default:"pending"},
    shippingAddress:{type:mongoose.Schema.Types.ObjectId,ref:"Address",required:true},
    orderItems:[{
        quantity:{type:Number,required:true,min:1},
        product:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true}
    } ],
    orderStatus:{type:String,enum:["processing","shipped","delivered","cancelled"],default:"processing"}
},{timestamps:true})

const Order= mongoose.model("Order",OrderSchema);

mongoose.model=Order;