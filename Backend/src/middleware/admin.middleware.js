module.exports=async(req,res,next)=>{
    if(req.user.role !== "admin"){
        return res.status(403).json({success:false,error:"Access denied"})
    }
    next();
}