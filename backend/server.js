require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

// CORS FIRST
app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());


// ========================
// 🔐 Security middleware
// ========================
app.use(helmet());

// ========================
// 🧠 Body parser
// ========================
app.use(express.json());

// ========================
// 🌐 CORS FIX (FINAL SAFE CONFIG)
// ========================

app.use(
  cors({
    origin: true, // ✅ Vercel + localhost sab allow
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Preflight fix
app.options("*", cors());

// ========================
// 🛣️ ROUTES
// ========================
app.use("/api/auth", require("./src/modules/auth/auth.routes"));
app.use("/api/tasks", require("./src/modules/tasks/tasks.routes"));
app.use("/api/reports", require("./src/modules/reports/reports.routes"));
app.use("/api/verticals", require("./src/modules/verticals/verticals.routes"));
// ========================


// ========================
// ❤️ HEALTH CHECK
// ========================
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running 🚀"
  });
});

// ========================
// 🚀 START SERVER
// ========================
const PORT = process.env.PORT || 3001;


// Keep Render free tier awake — ping every 14 minutes
const RENDER_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
setInterval(() => {
  fetch(`${RENDER_URL}/api/health`)
    .then(() => console.log("Keep-alive ping sent"))
    .catch((err) => console.log("Keep-alive failed:", err.message));
}, 14 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});