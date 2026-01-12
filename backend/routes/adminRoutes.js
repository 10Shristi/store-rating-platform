const express = require("express");
const router = express.Router();
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");
const db = require("../db");

// ADD STORE
router.post(
  "/store",
  authenticate,
  authorizeRoles(["ADMIN"]),
  (req, res) => {
    const { name, email, address } = req.body;

    db.query(
      "INSERT INTO stores (name, email, address) VALUES (?, ?, ?)",
      [name, email, address],
      () => res.json({ message: "Store added" })
    );
  }
);

// DASHBOARD STATS
router.get(
  "/stats",
  authenticate,
  authorizeRoles(["ADMIN"]),
  (req, res) => {
    const stats = {};

    db.query("SELECT COUNT(*) as users FROM users", (e, u) => {
      stats.users = u[0].users;

      db.query("SELECT COUNT(*) as stores FROM stores", (e, s) => {
        stats.stores = s[0].stores;

        db.query("SELECT COUNT(*) as ratings FROM ratings", (e, r) => {
          stats.ratings = r[0].ratings;
          res.json(stats);
        });
      });
    });
  }
);

module.exports = router;

