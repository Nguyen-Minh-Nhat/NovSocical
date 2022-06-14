const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { upload, transporter, deleteTmp } = require("../utils");
const saltRounds = 10;
var success = false;

const User = require("../models/User");
const authController = {
  otp: Math.floor(1000 + Math.random() * 9999).toString(),
  sendOTP: async (req, res) => {
    success = false;
    const { email } = req.body;
    try {
      //Check for exists
      const existUser = await User.findOne({ email });

      if (!existUser) {
        let mailOptions = {
          from: process.env.GMAIL_NAME,
          to: email,
          subject: "Otp for registration is: ",
          html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2; background:#191D29">
                <div style="margin:50px auto;background:white ;width:70%;padding:20px 0; padding:10px; border-radius:10px">
                <div style="border-bottom:1px solid #092665">
                  <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">NovSocial</a>
                </div>
                <p style="font-size:1.1em;">Hi,</p>
                <p>Thank you for choosing NovSocial. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${authController.otp}</h2>
                <p style="font-size:0.9em;">Regards,<br />NovSocial</p>
                </div>
                </div>`,
        };

        await transporter.sendMail(mailOptions);
        success = true;
      }
    } catch (error) {
      console.log(error);
    }
    if (req.files) await deleteTmp(req.files);
    if (success) {
      res.json({
        success,
        message: "OTP has been send",
      });
    } else {
      res.json({
        success,
        message: "This email has been registered",
      });
    }
  },

  confirmOTP: async (req, res) => {
    const inputOtp = req.body.otp;
    if (req.files) await deleteTmp(req.files);
    console.log(inputOtp);
    console.log(authController.otp);
    console.log(inputOtp === authController.otp);
    if (inputOtp === authController.otp) {
      res.json({ success: true, message: "OTP is correct" });
    } else {
      res.json({ success, message: "OTP is incorrect" });
    }
  },

  register: async (req, res) => {
    success = false;
    const { isDefault, avatar, password, name, birthDate, email } = req.body;
    var avatarPath = "";
    if (isDefault === "true") {
      avatarPath = await upload(
        `../client/public/assets/images/avatars/${avatar}`,
        "novsocial/avatars",
      );
    } else {
      const file = req.files.avatar;
      avatarPath = await upload(file.tempFilePath, "novsocial/avatars");
    }

    try {
      //Create new account
      const hash = bcrypt.hashSync(password, saltRounds);
      const newUser = new User({
        email,
        password: hash,
        avatar: avatarPath,
        name,
        birthDate,
      });
      await newUser.save();

      //Return token
      var accessToken = jwt.sign(
        { userID: newUser._id },
        process.env.ACCESS_TOKEN_CODE,
      );

      success = true;
    } catch (e) {
      console.log(e);
    }

    if (req.files) await deleteTmp(req.files);
    if (success) {
      res.json({
        success,
        message: "Register successfully",
        accessToken,
      });
    } else {
      res.json({ success, message: "You need to input all fields" });
    }
  },

  login: async (req, res) => {
    success = false;
    const { email, password } = req.body;
    try {
      //Check for exists
      const existUser = await User.findOne({ email });

      if (existUser) {
        const match = bcrypt.compareSync(password, existUser.password);
        if (match) {
          //Return token
          var accessToken = jwt.sign(
            {
              userID: existUser._id,
            },
            process.env.ACCESS_TOKEN_CODE,
          );
          success = true;
        }
      }
    } catch (error) {
      console.log(error);
    }

    if (req.files) await deleteTmp(req.files);
    if (success) {
      res.json({
        success,
        message: "Login successfully",
        accessToken,
      });
    } else {
      res.json({
        success,
        message: "Invalid account",
      });
    }
  },

  auth: async (req, res) => {
    const { userID } = req.body;
    const existUser = await User.findOne({ _id: userID }).select("-password");
    res.json({
      success: true,
      message: "Validate successfully",
      user: existUser,
    });
  },
};

module.exports = authController;
