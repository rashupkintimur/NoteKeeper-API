const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(bodyParser.json());

// errors messages
const EMPTY_PARAMS = "You hand over empty parameters";
const PASS_PARAMS = "You didn't pass all parameters";
const NOT_FOUND = "Not Found";

// get all notes
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

// create new note
app.post("/api/notes", async (req, res) => {
  const { title, text } = req.body;

  if (!title && !text) {
    return res.status(400).json({ error: PASS_PARAMS });
  }

  if (!title.length || !text.length) {
    return res.status(400).json({ error: EMPTY_PARAMS });
  }

  try {
    // if create new note was success, we get note id on which the operation was performed
    const id = await new Promise((resolve, reject) => {
      db.run(
        `
      INSERT INTO notes (title, text) VALUES (?, ?)
    `,
        [title, text],
        (err) => {
          if (err) reject(err);

          resolve(this.lastID);
        }
      );
    });

    res.status(201).json({ id: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get specific note
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

    if (!note) {
      res.status(404).json({ error: NOT_FOUND });
    } else {
      res.status(200).json(note);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// edit note
app.put("/api/notes/:id", async (req, res) => {
  const { title, text } = req.body;
  const id = req.params.id;

  if (!title && !text) {
    return res.status(400).json({ error: PASS_PARAMS });
  }

  if (!title.length || !text.length) {
    return res.status(400).json({ error: EMPTY_PARAMS });
  }

  try {
    // if edit note was success, we get note id on which the operation was performed
    const noteId = await new Promise((resolve, reject) => {
      db.run(
        `
        UPDATE notes SET title = ?, text = ? WHERE id = ?
      `,
        [title, text, id],
        (err) => {
          if (err) reject(err);

          resolve(id);
        }
      );
    });

    res.status(200).json({ id: noteId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete note
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // if update note was success, we get note id on which the operation was performed
    const noteId = await new Promise((resolve, reject) => {
      db.run(
        `
        DELETE FROM notes WHERE id = ?
      `,
        [id],
        (err) => {
          if (err) reject(err);

          resolve(id);
        }
      );
    });

    res.status(200).json({ id: noteId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
