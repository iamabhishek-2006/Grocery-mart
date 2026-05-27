const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,  // 10 minute
  max: 15,
  message: {
    success: false,
    message: "Your account has been blocked for 15 minutes . Too many login attempts.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {loginLimiter};
