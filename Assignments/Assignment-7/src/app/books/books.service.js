import {
  insertBook,
  insertBooks,
  updateBookByTitle as updateBookByTitleRepository,
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
} from "./books.repository.js";

export const createBookService = async (book) => {
  return insertBook(book);
};

export const createBooksService = async (books) => {
  return insertBooks(books);
};

export const updateBookByTitleService = async (title, updateData) => {
  return updateBookByTitleRepository(title, updateData);
};

export const findBookByTitleService = async (title) => {
  return findBookByTitle(title);
};

export const findBooksByYearRangeService = async (from, to) => {
  return findBooksByYearRange(from, to);
};

export const findBooksByGenreService = async (genre) => {
  return findBooksByGenre(genre);
};

export const findBooksWithSkipLimitService = async () => {
  return findBooksWithSkipLimit();
};

export const findBooksWithIntegerYearService = async () => {
  return findBooksWithIntegerYear();
};

export const findBooksExcludingGenresService = async (genres) => {
  return findBooksExcludingGenres(genres);
};

export const deleteBooksBeforeYearService = async (year) => {
  return deleteBooksBeforeYear(year);
};

export const aggregateBooksAfterYearService = async (year) => {
  return aggregateBooksAfterYear(year);
}

export const aggregateBooksWithProjectionService = async (year) => {
  return aggregateBooksWithProjection(year);
};

export const aggregateBooksWithUnwindService = async () => {
  return aggregateBooksWithUnwind();
};

export const aggregateBooksWithLogsService = async () => {
  return aggregateBooksWithLogs();
};