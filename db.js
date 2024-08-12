const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

// create db if not exists
fs.access("notekeeper.db", fs.constants.F_OK, (err) => {
  if (err) {
    fs.open("notekeeper.db", "w", (err) => {
      if (err) process.exit(err.message);

      console.log("Database created.");
    });
  }
});

const db = new sqlite3.Database("./notekeeper.db", (err) => {
  if (err) process.exit("Sqlite server doesn't started: ", err);
  else {
    console.log("Sqlite server started...");

    db.serialize(() => {
      db.run(`
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title VARCHAR(255),
                text TEXT
            );
        `);
    });
  }
});

module.exports = db;
