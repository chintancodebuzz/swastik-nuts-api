import express from "express";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes/index.js";
import path from "path";

const app = express();

/* =======================
   GLOBAL MIDDLEWARES
======================= */

// Parse JSON bodies (🔥 REQUIRED)
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

// HTTP request logger
app.use(morgan("dev"));

/* =======================
   ROUTES
======================= */

app.use("/api", routes);

/* =======================
   HEALTH CHECK
======================= */

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running 🚀" });
});

/* =======================
   404 HANDLER
======================= */

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/* =======================
   GLOBAL ERROR HANDLER
======================= */

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({
    message: "Internal Server Error",
  });
});

export default app;
