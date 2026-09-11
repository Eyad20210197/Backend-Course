import {
  createBookService,
  createBooksService,
  updateBookByTitleService,
  findBookByTitleService,
  findBooksByYearRangeService,
  findBooksByGenreService,
  findBooksWithSkipLimitService,
  findBooksWithIntegerYearService,
  findBooksExcludingGenresService,
  deleteBooksBeforeYearService,
  aggregateBooksAfterYearService,
  aggregateBooksWithProjectionService,
  aggregateBooksWithUnwindService,
  aggregateBooksWithLogsService,
} from "./books.service.js";

import { successResponse } from "../../common/utils/successResponse.js";

export const createBook = async (req, res) => {
  const result = await createBookService(req.body);

  return successResponse(res, {
    statusCode: 201,
    message: "Book created successfully",
    data: result,
  });
};

export const createBooks = async (req, res) => {
  const result = await createBooksService(req.body);

  return successResponse(res, {
    statusCode: 201,
    message: "Books created successfully",
    data: result,
  });
};

export const updateBookByTitle = async (req, res) => {
  const { title } = req.params;

  const result = await updateBookByTitleService(
    title,
    req.body
  );

  return successResponse(res, {
    statusCode: 200,
    message: "Book updated successfully",
    data: result,
  });
};

export const findBookByTitle = async (req, res) => {
  const { title } = req.query;

  const result = await findBookByTitleService(title);

  return successResponse(res, {
    statusCode: 200,
    message: "Book found successfully",
    data: result,
  });
};

export const findBooksByYearRange = async (req, res) => {
  const from = Number(req.query.from);
  const to = Number(req.query.to);

  const result = await findBooksByYearRangeService(from, to);

  return successResponse(res, {
    statusCode: 200,
    message: "Books found successfully",
    data: result,
  });
};

export const findBooksByGenre = async (req, res) => {
  const { genre } = req.query;

  const result = await findBooksByGenreService(genre);

  return successResponse(res, {
    statusCode: 200,
    message: "Books found successfully",
    data: result,
  });
};

export const findBooksWithSkipLimit = async (req, res) => {
  const result = await findBooksWithSkipLimitService();

  return successResponse(res, {
    statusCode: 200,
    message: "Books retrieved successfully",
    data: result,
  });
};

export const findBooksWithIntegerYear = async (req, res) => {
  const result = await findBooksWithIntegerYearService();

  return successResponse(res, {
    statusCode: 200,
    message: "Books with integer year retrieved successfully",
    data: result,
  });
};

export const findBooksExcludingGenres = async (req, res) => {
  const genres = req.query.genres
    ? req.query.genres.split(",")
    : [];

  const result = await findBooksExcludingGenresService(genres);

  return successResponse(res, {
    statusCode: 200,
    message: "Books retrieved successfully",
    data: result,
  });
};

export const deleteBooksBeforeYear = async (req, res) => {
  const year = Number(req.query.year);

  const result = await deleteBooksBeforeYearService(year);

  return successResponse(res, {
    statusCode: 200,
    message: "Books deleted successfully",
    data: result,
  });
};

export const aggregateBooksAfterYear = async (req, res) => {
  const year = Number(req.query.year ?? 2000);

  const result = await aggregateBooksAfterYearService(year);

  return successResponse(res, {
    statusCode: 200,
    message: "Books retrieved successfully",
    data: result,
  });
};

export const aggregateBooksWithProjection = async (req, res) => {
  const year = Number(req.query.year ?? 2000);

  const result = await aggregateBooksWithProjectionService(year);

  return successResponse(res, {
    statusCode: 200,
    message: "Books retrieved successfully",
    data: result,
  });
};

export const aggregateBooksWithUnwind = async (req, res) => {
  const result = await aggregateBooksWithUnwindService();

  return successResponse(res, {
    statusCode: 200,
    message: "Books with unwound genres retrieved successfully",
    data: result,
  });
};

export const aggregateBooksWithLogs = async (req, res) => {
  const result = await aggregateBooksWithLogsService();

  return successResponse(res, {
    statusCode: 200,
    message: "Books with logs retrieved successfully",
    data: result,
  });
};