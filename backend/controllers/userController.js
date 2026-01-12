const db = require("../db");
const bcrypt = require("bcrypt");
const db = require("../db");

exports.updatePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;

  db.query(
    "SELECT password FROM users WHERE id = ?",
    [req.user.id],
    (err, result) => {
      if (err || result.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = bcrypt.compareSync(
        oldPassword,
        result[0].password
      );

      if (!isMatch) {
        return res.status(400).json({ message: "Old password incorrect" });
      }

      const hashed = bcrypt.hashSync(newPassword, 10);

      db.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [hashed, req.user.id],
        () => {
          res.json({ message: "Password updated successfully" });
        }
      );
    }
  );
};

exports.getStores = (req, res) => {
  const search = req.query.search || "";

  const sql = `
    SELECT 
      s.id,
      s.name,
      s.address,
      AVG(r.rating) AS overallRating,
      (
        SELECT rating 
        FROM ratings 
        WHERE store_id = s.id AND user_id = ?
      ) AS userRating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE s.name LIKE ? OR s.address LIKE ?
    GROUP BY s.id
  `;

  db.query(
    sql,
    [req.user.id, `%${search}%`, `%${search}%`],
    (err, result) => {
      if (err) return res.status(400).json({ message: "Error" });
      res.json(result);
    }
  );
};


exports.rateStore = (req, res) => {
  const { store_id, rating } = req.body;

  db.query(
    "SELECT * FROM ratings WHERE user_id=? AND store_id=?",
    [req.user.id, store_id],
    (err, result) => {
      if (result.length > 0) {
        db.query(
          "UPDATE ratings SET rating=? WHERE id=?",
          [rating, result[0].id],
          () => res.json({ message: "Rating updated" })
        );
      } else {
        db.query(
          "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)",
          [req.user.id, store_id, rating],
          () => res.json({ message: "Rating submitted" })
        );
      }
    }
  );
};

