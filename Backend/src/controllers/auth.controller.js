const { generateToken } = require("../scripts/utils");
const { signUpDB, loginDB } = require("../services/auth.service");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: "all fields are required",
    });
  }

  try {
    const data = await signUpDB({ name, email, password });
    return res.status(201).json({
      success: true,
      message: "signup successfully",
      data: data,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "user already exists",
      });
    }

    return res.status(500).json({
        success:false,
        error:error.message
    });
  }
};

const login = async (req, res) => {
  const {email, password } = req.body;

  if ( !email || !password) {
    return res.status(400).json({
      success: false,
      error: "all fields are required",
    });
  }

  try {
    const user = await loginDB({  email, password });

    if(!user){
      return res.status(400).json({
        success:false,
        error:"User not found"
      })
    }

    const {accessToken,refreshToken}=generateToken({
      id:user._id,
      name:user.name,
      email:user.email,
      role:user.role
    });

    res.cookie("accessToken",accessToken,{
      httpOnly:true,
      secure:false,
      sameSite:"lax"
    })

    return res.status(201).json({
      success: true,
      message: "login successfully",
      data: {accessToken,refreshToken,user},
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};

module.exports={signUp,login};
