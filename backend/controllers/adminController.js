const db = require("../db");

exports.addStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;

  const sql =
    "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, address, owner_id], (err) => {
    if (err) {
      return res.status(400).json({ message: "Error adding store" });
    }
    res.json({ message: "Store added successfully" });
  });
};

exports.getStats = (req, res) => {
  const stats = {};

  db.query("SELECT COUNT(*) as users FROM users", (err, u) => {
    stats.users = u[0].users;

    db.query("SELECT COUNT(*) as stores FROM stores", (err, s) => {
      stats.stores = s[0].stores;

      db.query("SELECT COUNT(*) as ratings FROM ratings", (err, r) => {
        stats.ratings = r[0].ratings;
        res.json(stats);
      });
    });
  });
};
