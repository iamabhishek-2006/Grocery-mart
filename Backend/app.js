require("dotenv").config()
const express=require("express");
const connectDB=require("./src/config/dbconnection");
const authRoutes=require("./src/routes/auth.routes");
const adminRoutes=require("./src/routes/admin");
const publicRoutes=require("./src/routes/public.routes");
const userRoutes=require("./src/routes/users");
const adminMiddleware=require("./src/middleware/admin.middleware")

const cookieParser=require("cookie-parser");
const authMiddleware = require("./src/middleware/auth.middleware");
const morgan=require("morgan")
const cors= require("cors");


const app=express();

const PORT = process.env.PORT || 9000;

app.use(express.json());

// app.use(cors({  origin: "http://localhost:5173",  credentials: true,}));
app.use( cors({ origin: true, credentials: true}));

app.use(morgan("combined")); 

app.use(cookieParser());
connectDB();

app.get("/",(req,res)=>{
    res.send("hellow world");
})

app.use("/public",publicRoutes);
app.use("/auth",authRoutes);

app.use(authMiddleware);

app.use("/admin", adminMiddleware, adminRoutes);

app.use("/user",userRoutes);

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
});