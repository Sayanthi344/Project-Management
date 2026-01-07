import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./routes/index.js";

dotenv.config(); // MUST be at the top

const app = express();

console.log("PORT =", process.env.PORT);
console.log("MONGO_URI =", process.env.MONGO_URI);

// CORS: allow specific FRONTEND_URL or fallback
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

// ✅ Correct DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB Connected successfully."))
  .catch((err) => console.log("❌ Failed to connect to DB:", err));

const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to TaskHub API",
  });
});

app.use("/api", routes);

// Not found error
app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

// Error middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
