const User = require("../models/user");

const signUpDB=async({name,email,password})=>{
    const registerUser=new User({name,email,password});
    await registerUser.save();
    return registerUser;
};

const loginDB=async({email,password})=>{
    const data=await User.findOne({email})
    return data;
}

module.exports={signUpDB,loginDB}