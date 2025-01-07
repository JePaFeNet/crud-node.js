const path = require("path");
const sqlite = require("sqlite3");

const db = new sqlite.Database(
  path.resolve(__dirname, "../../database.db"),
  (error) => {
    if (error) {
      return console.error(error);
    }

    const sql = `CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(100) NOT NULL
        )`;

    db.run(sql, (error) => {
      if (error) {
        return console.error(error);
      }
    });
  }
);

module.exports = db;
