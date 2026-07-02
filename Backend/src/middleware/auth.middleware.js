const { verifyToken } = require("../utils/scripts");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "token missing",
      });
    }

    const payload = verifyToken(token);

    if (!payload || !payload.id) {
      return res.status(401).json({
        success: false,
        error: "invalid token",
      });
    }

    req.user = payload;
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      error: "something went wrong",
    });
  }
};
