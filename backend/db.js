const mysql = require("mysql");

let db;

try {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) {
      console.error("⚠️ MySQL not connected (will connect later)");
    } else {
      console.log("✅ MySQL connected");
    }
  });
} catch (error) {
  console.error("⚠️ MySQL skipped for now");
}

module.exports = db;

