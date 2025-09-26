import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import Route
import Routes from "./routes/route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true }));

// Use a fallback port in case .env is missing PORT
const PORT = process.env.PORT || 3000;

// Root Route
app.get('/', (req, res) => {
    res.status(200).send("Welcome to root URL of Server");
});

// Custom Routes
app.use("/api", Routes);

// 404
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler (optional)
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

// Start server
app.listen(PORT, (error) => {
    if (!error) {
        console.log(`✅ Server is running at http://localhost:${PORT}`);
    } else {
        console.error("❌ Error occurred, server can't start", error);
    }
});