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
        lower:true,  // convert into lower case
        strict:true ,    // remove all characters
        // replacement: "-", // default hi hai
        // remove: /[*+~.()'"!:@&|]/g  // important
    });
}

module.exports={generateToken,generateSlug}