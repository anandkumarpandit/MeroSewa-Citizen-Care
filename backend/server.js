const fs = require("fs");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config({ path: path.join(__dirname, "config.env") });

const app = express();

// ---------------------
//  MIDDLEWARE
// ---------------------
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// ---------------------
// STATIC UPLOADS FOLDER
// ---------------------
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static(uploadsDir));

// ---------------------
// ROUTES IMPORT
// ---------------------
app.use("/api/complaints", require("./routes/complaints"));
app.use("/api/auth", require("./routes/auth"));
//app.use("/api/officer", require("./routes/officer"));

// ---------------------
// DATABASE CONNECTION
// ---------------------
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// ---------------------
// START SERVER
// ---------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
