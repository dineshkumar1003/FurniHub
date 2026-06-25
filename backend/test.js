const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:admin123@cluster0.vg752kt.mongodb.net/furnihub?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB Connected");
    process.exit(0);
  })
  .catch((err) => {
    console.log("❌ Connection Error:");
    console.log(err);
    process.exit(1);
  });