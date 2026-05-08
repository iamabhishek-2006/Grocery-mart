const express=require("express");
const connectDB=require("./src/config/dbconnection");
const authRoutes=require("./src/routes/auth.routes");
const adminRoutes=require("./src/routes/admin");
// const publicRoutes=require()

const cookieParser=require("cookie-parser")

require("dotenv").config()

const app=express();
app.use(express.json());
app.use(cookieParser());
connectDB();

PORT=9000;

app.get("/",(req,res)=>{
    res.send("hellow world");
})

app.use("/public",require("./src/routes/public.routes"));
app.use("/auth",authRoutes);
app.use("/user",require("./src/routes/users"));
app.use("/admin",adminRoutes);

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
});