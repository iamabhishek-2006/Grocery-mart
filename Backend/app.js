const express=require("express");
const connectDB=require("./src/config/dbconnection");
const authRoutes=require("./src/routes/auth.routes");
const adminOnly=require("./src/routes/admin");
const publicRoutes=require("./src/routes/public.routes");
const userRoutes=require("./src/routes/users");
const adminMiddleware=require("./src/middleware/admin.middleware")

const cookieParser=require("cookie-parser");
const authMiddleware = require("./src/middleware/auth.middleware");
const morgan=require("morgan")

require("dotenv").config()

const app=express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(morgan("combined")); 

app.use(cookieParser());
connectDB();

app.get("/",(req,res)=>{
    res.send("hellow world");
})

app.use("/public",publicRoutes);
app.use("/auth",authRoutes);

app.use(authMiddleware);

app.use("/admin", adminMiddleware, adminOnly);

app.use("/user",userRoutes);

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
});