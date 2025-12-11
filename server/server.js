const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect database
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/issues", require("./routes/issueRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
