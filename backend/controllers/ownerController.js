const db = require("../db");

exports.getRatings = (req, res) => {
  const sql = `
    SELECT u.name, r.rating
    FROM ratings r
    JOIN users u ON r.user_id = u.id
    JOIN stores s ON r.store_id = s.id
    WHERE s.owner_id = ?
  `;

  db.query(sql, [req.user.id], (err, result) => {
    if (err) return res.status(400).json({ message: "Error" });
    res.json(result);
  });
};

exports.getAverageRating = (req, res) => {
  const sql = `
    SELECT AVG(r.rating) as average
    FROM ratings r
    JOIN stores s ON r.store_id = s.id
    WHERE s.owner_id = ?
  `;

  db.query(sql, [req.user.id], (err, result) => {
    res.json({ average: result[0].average });
  });
};
