import express from "express";

import collectionsRoutes from "./app/collections/collections.routes.js";
import booksRoutes from "./app/books/books.routes.js";
import logsRoutes from "./app/logs/logs.routes.js";

import { notFound } from "./common/middleware/notFound.js";
import { errorHandler } from "./common/middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Assignment 7 API is running",
  });
});

app.use("/collection", collectionsRoutes);
app.use("/books", booksRoutes);
app.use("/logs", logsRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;