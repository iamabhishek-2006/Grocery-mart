const express=require("express");
const connectDB=require("./src/config/dbconnection")
require("dotenv").config()
const {addUser}=require("./src/controllers/user.controller")

const app=express();
connectDB();

PORT=9000;

app.get("/",(req,res)=>{
    res.send("hellow world")
})


app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
});