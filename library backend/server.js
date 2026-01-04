const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = 5000;

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- MONGODB CONNECTION (LOCAL) ---------- */
mongoose
  .connect("mongodb://127.0.0.1:27017/libraryDB")
  .then(() => console.log("✅ MongoDB Connected (Local)"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* ---------- API ROUTES ---------- */
app.use("/api/books", bookRoutes);

/* ---------- SERVE FRONTEND ---------- */
/*
Project structure expected:
library-management/
│
├── backend/
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
*/

app.use(express.static(path.join(__dirname, "../frontend")));

/* ---------- DEFAULT ROUTE ---------- */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

/* ---------- GLOBAL ERROR HANDLER ---------- */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

/* ---------- START SERVER ---------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
