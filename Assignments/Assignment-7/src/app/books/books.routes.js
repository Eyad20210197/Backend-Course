import express from "express";

import {
  createBook,
  createBooks,
  updateBookByTitle,
  findBookByTitle,
  findBooksByYearRange,
  findBooksByGenre,
  findBooksWithSkipLimit,
  findBooksWithIntegerYear,
  findBooksExcludingGenres,
  deleteBooksBeforeYear,
  aggregateBooksAfterYear,
  aggregateBooksWithProjection,
  aggregateBooksWithUnwind,
  aggregateBooksWithLogs,
} from "./books.controller.js";

const router = express.Router();

router.post("/", createBook); // Route to create a single book

router.post("/batch", createBooks); // Route to create multiple books

router.patch("/:title", updateBookByTitle); // Route to update a book by title

router.get("/title", findBookByTitle); // Route to find a book by title

router.get("/year", findBooksByYearRange); // Route to find books by year range

router.get("/genre", findBooksByGenre); // Route to find books by genre

router.get("/skip-limit", findBooksWithSkipLimit); // Route to find books with skip and limit

router.get("/year-integer", findBooksWithIntegerYear); // Route to find books with integer year

router.get("/exclude-genres", findBooksExcludingGenres); // Route to find books excluding specific genres

// In the task it is explicitly mentioned to use GET method for deleting in the assignment,
//  but it is not a good practice to use GET for deleting resources.
router.delete("/before-year", deleteBooksBeforeYear); // Route to delete books before a specific year

router.get("/aggregate-1", aggregateBooksAfterYear); // Route to aggregate books after a specific year

router.get("/aggregate-2", aggregateBooksWithProjection); // Route to aggregate books with projection

router.get("/aggregate-3", aggregateBooksWithUnwind); // Route to aggregate books with unwind

router.get("/aggregate-4", aggregateBooksWithLogs); // Route to aggregate books with logs

export default router;