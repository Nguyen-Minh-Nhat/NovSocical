const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log(req);
  const token = req.header("accessToken");
  console.log(token);
  if (!token) return res.json({ success: false, message: "User not log in!" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_CODE);
    req.body.userID = decoded.userID;
    next();
  } catch (error) {
    return res.json({ success: false, message: "User not log in!", error });
  }
};

module.exports = verifyToken;