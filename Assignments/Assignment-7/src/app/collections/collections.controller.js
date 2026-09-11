import {
  createBooksCollectionService,
  createAuthorsCollectionService,
  createCappedLogsCollectionService,
  createBooksTitleIndexService,
} from "./collections.service.js";

import { successResponse } from "../../common/utils/successResponse.js";

export const createBooksCollection = async (req, res) => {
  const result = await createBooksCollectionService();

  return successResponse(res, {
    statusCode: 201,
    message: "Books collection created successfully",
    data: result,
  });
};

export const createAuthorsCollection = async (req, res) => {
  const result = await createAuthorsCollectionService(req.body);

  return successResponse(res, {
    statusCode: 201,
    message: "Author created successfully",
    data: result,
  });
};

export const createCappedLogsCollection = async (req, res) => {
  const result = await createCappedLogsCollectionService();

  return successResponse(res, {
    statusCode: 201,
    message: "Capped logs collection created successfully",
    data: result,
  });
};

export const createBooksTitleIndex = async (req, res) => {
  const result = await createBooksTitleIndexService();

  return successResponse(res, {
    statusCode: 201,
    message: "Books title index created successfully",
    data: result,
  });
};