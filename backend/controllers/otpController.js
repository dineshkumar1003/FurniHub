const Otp = require("../models/otp");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
// SEND OTP
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otp,
      expiresAt:
        Date.now() + 5 * 60 * 1000,
    });

    await sendEmail(
      email,
      "FurniHub OTP Verification",
      `Thank you for helping me implement the OTP verification system! Your guidance made the entire process much easier to understand and integrate into my FurniHub project.

      I'm really happy with the progress I've made so far, and adding OTP verification has made the application more secure and professional. I appreciate your support and step-by-step explanations throughout this journey.

      Looking forward to building and learning even more. Thanks again for being a great help! 🚀😊
      : ${otp}
      This OTP will expire in 5 minutes.

      Do not share this code with anyone.`
    );

    res.json({
      message: "OTP Sent Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// VERIFY OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord =
      await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({
        message: "OTP not found",
      });
    }

    if (
      otpRecord.expiresAt <
      Date.now()
    ) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    await Otp.deleteMany({ email });

    res.json({
      message:
        "OTP Verified Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    console.log("RESET EMAIL:", email);

    const user = await User.findOne({
      email: email.trim(),
    });

    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.password = newPassword;

    await user.save();

    res.json({
      message: "Password Reset Successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  sendOtp,
  verifyOtp,
  resetPassword,
};