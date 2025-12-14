// server/scripts/demoteAdmins.js
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(await User.find({ role: "admin" }).select("email role"));
  // To demote all:
  // await User.updateMany({ role: "admin" }, { $set: { role: "citizen" }});
  await mongoose.disconnect();
}
run().catch(err => { console.error(err); process.exit(1); });
