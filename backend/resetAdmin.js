const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

async function resetPassword() {
  try {
    const user = await User.findOne({
      email: "dineshkumar628178@gmail.com",
    });

    if (!user) {
      console.log("User not found");
      process.exit();
    }

    user.password = "dinesh123";

    await user.save();

    console.log("Password reset successful");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

resetPassword();