const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
    await mongoose.connect(process.env.DB_URL);
    console.log("database connection successfully");
    }catch(error){
        console.log(error,"database connection failed");
        process.exit(1);
    }
}

module.exports=connectDB;


