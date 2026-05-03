const { signUpDB, loginDB } = require("../services/user.service");

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
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "user already exists",
      });
    }

    return res.status(500).json({
        success:false,
        error:"something went wrong"
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
    const data = await loginDB({  email, password });
    return res.status(201).json({
      success: true,
      message: "login successfully",
      data: data,
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
