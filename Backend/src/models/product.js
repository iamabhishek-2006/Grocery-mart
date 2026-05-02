const mongoose=require("mongoose");

const productSchema= new mongoose.Schema({
    title:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    slug:{type:String,required:true,unique:true},
    mrp:{type:Number,required:true},
    image:{type:String,required:true},
    stock:{type:Number,required:true},
    category:{type:mongoose.Schema.ObjectId,ref:"Category",required:true},
    user:{type:mongoose.Schema.ObjectId,required:true}
});

const Product=mongoose.model("Product",productSchema);

module.exports=Product;


