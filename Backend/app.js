const express=require("express");
const connectDB=require("./src/config/dbconnection");
const authRoutes=require("./src/routes/auth.routes")

require("dotenv").config()

const app=express();
app.use(express.json());
connectDB();

PORT=9000;

app.get("/",(req,res)=>{
    res.send("hellow world");
})

app.use("/auth",authRoutes);

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
});