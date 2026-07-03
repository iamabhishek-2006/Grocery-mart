const jwt=require("jsonwebtoken");
const slugify=require("slugify");
const bcrypt=require("bcrypt")

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

const hashPassword=(password)=>{
    return bcrypt.hash(password,12);
}

const verifyPassword=(password,hashPassword)=>{
    return bcrypt.compare(password,hashPassword);
}

module.exports = { generateToken, generateSlug, verifyToken, hashPassword ,verifyPassword };