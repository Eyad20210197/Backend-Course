import {
  createBooksCollection,
  createAuthorsCollection as createAuthorsCollectionRepository,
  createCappedLogsCollection as createCappedLogsCollectionRepository,
  createBooksTitleIndex as createBooksTitleIndexRepository,
} from "./collections.repository.js";

export const createBooksCollectionService = async () => {
  return createBooksCollection();
};

export const createAuthorsCollectionService = async (author) => {
  return createAuthorsCollectionRepository(author);
};

export const createCappedLogsCollectionService = async () => {
  return createCappedLogsCollectionRepository();
};

export const createBooksTitleIndexService = async () => {
  return createBooksTitleIndexRepository();
};