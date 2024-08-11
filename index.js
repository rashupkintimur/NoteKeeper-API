const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(bodyParser.json());

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM notes", (err, rows) => {
        if (err) reject(err);

        resolve(rows);
      });
    });

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/notes", async (req, res) => {
  const { title, text } = req.body;

  try {
    const result = await new Promise((resolve, reject) => {
      db.run(
        `
      INSERT INTO notes (title, text) VALUES (?, ?)
    `,
        [title, text],
        (err) => {
          if (err) reject(err);

          resolve("success");
        }
      );
    });

    res.status(200).json({ message: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const note = await new Promise((resolve, reject) => {
      db.get(
        `
        SELECT * FROM notes WHERE id = ? LIMIT 1;
      `,
        [id],
        (err, row) => {
          if (err) reject(err);

          resolve(row);
        }
      );
    });

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/notes/:id", async (req, res) => {
  const { title, text } = req.body;
  const id = req.params.id;

  if (!title && !text) {
    return res.status(400).json({ error: "you did not pass any parameters" });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      db.run(
        `
        UPDATE notes SET title = ?, text = ? WHERE id = ?
      `,
        [title, text, id],
        (err) => {
          if (err) reject(err);

          resolve("success");
        }
      );
    });

    res.status(200).json({ message: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await new Promise((resolve, reject) => {
      db.run(
        `
        DELETE FROM notes WHERE id = ?
      `,
        [id],
        (err) => {
          if (err) reject(err);

          resolve("success");
        }
      );
    });

    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
