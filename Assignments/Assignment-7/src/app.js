import express from "express";

import path from "path";
import { fileURLToPath } from "url";

import collectionsRoutes from "./app/collections/collections.routes.js";
import booksRoutes from "./app/books/books.routes.js";
import logsRoutes from "./app/logs/logs.routes.js";

import { notFound } from "./common/middleware/notFound.js";
import { errorHandler } from "./common/middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webDir = path.join(__dirname, "../web_test");

const app = express();

app.use(express.json());

// Enable CORS for local browsers and test runners
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Serve static frontend files from web_test
app.use(express.static(webDir));

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Assignment 7 API is running",
  });
});

app.get("/", (req, res, next) => {
  if (req.accepts("html")) {
    return res.sendFile(path.join(webDir, "index.html"));
  }
  res.json({
    success: true,
    message: "Assignment 7 API is running",
  });
});

app.use("/collection", collectionsRoutes);
app.use("/books", booksRoutes);
app.use("/logs", logsRoutes);

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use(notFound);

app.use(errorHandler);

export default app;