const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("accessToken");
    if (!token)
        return res.json({ success: false, message: "User not log in!" });
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_CODE);
        req.body.userID = decoded.userID;
        next();
    } catch (error) {
        return res.json({
            success: false,
            message: "User not log in1!",
            error,
        });
    }
};

module.exports = verifyToken;
