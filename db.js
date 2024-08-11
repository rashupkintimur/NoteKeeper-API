const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./notekeeper.db", (err) => {
  if (err) console.log("Sqlite server doesn't started: ", err);
  else console.log("Sqlite server started...");
});

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR(255),
            text TEXT
        );
    `);
});

module.exports = db;
