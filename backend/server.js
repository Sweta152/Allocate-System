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




app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});