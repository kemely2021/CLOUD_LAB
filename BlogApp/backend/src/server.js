const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY fecha DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener posts" });
  }
});

app.post("/api/posts", async (req, res) => {
  try {
    const { titulo, contenido, autor } = req.body;
    const result = await pool.query(
      "INSERT INTO posts (titulo, contenido, autor) VALUES ($1, $2, $3) RETURNING *",
      [titulo, contenido, autor]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear post" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend listening on port", PORT);
});