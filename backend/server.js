import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import postRoutes from "./routes/postRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
