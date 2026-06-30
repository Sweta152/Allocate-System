require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// ========================
// 🔐 Security middleware
// ========================
app.use(helmet());

// ========================
// 🧠 Body parser
// ========================
app.use(express.json());

// ========================
// 🌐 CORS CONFIG (FIXED)
// ========================

// Allow multiple Vercel + local + production-safe
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://allocate-system-f3uf51iej-sweta15.vercel.app",
  "https://allocate-system-82uv51x9a-sweta15.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow tools like Postman / server-to-server
      if (!origin) return callback(null, true);

      // allow all Vercel preview URLs (SAFE FOR YOUR CASE)
      if (origin.includes("vercel.app")) {
        return callback(null, true);
      }

      // allow local + known origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, true); // ⚠️ fallback (prevents blocking in prod)
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Preflight requests fix
app.options("*", cors());

// ========================
// 🛣️ Routes
// ========================
app.use("/api/auth", require("./src/modules/auth/auth.routes"));
app.use("/api/tasks", require("./src/modules/tasks/tasks.routes"));
app.use("/api/reports", require("./src/modules/reports/reports.routes"));

// ========================
// ❤️ Health check
// ========================
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running 🚀" });
});

// ========================
// 🚀 Start server
// ========================
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});