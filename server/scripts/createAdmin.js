// server/scripts/createAdmin.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const email = "admin@test.com"; // change
  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin exists:", existing.email);
    process.exit(0);
  }
  const hashed = await bcrypt.hash("admin1234", 10);
  const admin = await User.create({ name: "Initial Admin", email, password: hashed, role: "admin" });
  console.log("Created admin:", admin.email);
  await mongoose.disconnect();
}
run().catch(err => { console.error(err); process.exit(1); });
