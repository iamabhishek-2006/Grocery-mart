const jwt=require("jsonwebtoken");
const generateToken=(data)=>{
    const accessToken = jwt.sign(data,process.env.JWT_SECRET,{
        expiresIn:"1d"
    });

    const refreshToken=jwt.sign(data,process.env.JWT_SECRET,{
        expiresIn:"1d"
    });
    
    return {accessToken,refreshToken}
}

module.exports={generateToken}