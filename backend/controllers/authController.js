const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register (Normal User only)
exports.register = (req, res) => {
  const { name, email, password, address } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql =
    "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, 'USER')";

  db.query(sql, [name, email, hashedPassword, address], (err) => {
    if (err) {
      return res.status(400).json({ message: "User already exists" });
    }
    res.json({ message: "User registered successfully" });
  });
};

// Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result[0];

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role });
  });
};
