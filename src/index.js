import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/index.js";
import router from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// _________________API__________________

app.get("/", (req, res) => {
  res.json({
    message: "School Management System Local Server Working !",
  });
});

app.use("/api", router);

const port = process.env.PORT || 4000;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Express running → On http://localhost:${port} 🚀`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });

app.use((err, req, res, next) => {
  const message = err || "Internal server error";
  res.status(500).json({
    success: false,
    message,
    error: err.stack,
  });
});
