import express from "express";

import {
  createBooksCollection,
  createAuthorsCollection,
  createCappedLogsCollection,
  createBooksTitleIndex,
} from "./collections.controller.js";

const router = express.Router();

router.post("/books", createBooksCollection); // Route to create books collection

router.post("/authors", createAuthorsCollection); // Route to create authors collection

router.post("/logs/capped", createCappedLogsCollection); // Route to create capped logs collection

router.post("/books/index", createBooksTitleIndex); // Route to create an index on the title field of the books collection

export default router;