const mongoose=require("mongoose");

const addresSchema=()=>new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    fullName:{type:String,required:true},
    phone:{type:Number,required:true},
    line1:{type:String,required:true},
    line2:{type:String,required:true},    
    landmark:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    country:{type:String,required:true},
    ZipCode:{type:Number,required:true},
},{timestamps:true});

const Address=mongoose.model("Address",addresSchema);

module.exports=Address;