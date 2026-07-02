const mongoose=require("mongoose");

const imageSchema=new mongoose.Schema({
    image_url:{type:String,required:true},
    public_id:{type:String,required:true},
    product_id:{type:mongoose.Schema.ObjectId,ref:"Product",required:true}
});

const Images=mongoose.model("Images",imageSchema);

module.exports=Images;