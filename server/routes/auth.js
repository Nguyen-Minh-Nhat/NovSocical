const router = require("express").Router();
const verifyToken = require("../middleware/auth");
const authController = require("../controllers/authController");

//send otp
router.post("/otp", authController.sendOTP);

//comfirmOTP
router.post("/confirmOtp", authController.confirmOTP);

//Register an account
router.post("/register", authController.register);

//Login
router.post("/login", authController.login);

//Auth
router.get("/", verifyToken, authController.auth);

module.exports = router;
