// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// // DB connection
// const db = require("./db");

// // Create app FIRST
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes imports
// const authRoutes = require("./routes/authRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const userRoutes = require("./routes/userRoutes");
// const ownerRoutes = require("./routes/ownerRoutes");

// // Routes usage
// app.use("/auth", authRoutes);
// app.use("/admin", adminRoutes);
// app.use("/user", userRoutes);
// app.use("/owner", ownerRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("Store Rating Platform Backend is running");
// });

// // Server start
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log("MySQL connected successfully");
//   console.log(`Server running on port ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const ownerRoutes = require("./routes/ownerRoutes");

const app = express(); // ✅ app MUST be before app.use

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/owner", ownerRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
