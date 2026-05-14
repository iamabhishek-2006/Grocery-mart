const jwt=require("jsonwebtoken");
const slugify=require("slugify");

const generateToken=(data)=>{
    const accessToken = jwt.sign(data,process.env.JWT_SECRET,{
        expiresIn:"1d"
    });

    const refreshToken=jwt.sign(data,process.env.JWT_SECRET,{
        expiresIn:"1d"
    });
    
    return {accessToken,refreshToken}
}

const generateSlug=(name)=>{
    return slugify(name,{
        lower:true,
        strict:true,
    });
}

const verifyToken=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET);
}

module.exports={generateToken,generateSlug,verifyToken}