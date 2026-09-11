import { getDB } from "../../common/db/connection.js";

export const createBooksCollection = async () => {
  const db = getDB();

  await db.createCollection("books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            minLength: 1,
            description:
              "title is required and must be a non-empty string",
          },
        },
      },
    },
  });

  return {
    collection: "books",
    created: true,
  };
};

export const createAuthorsCollection = async (author) => {
  const db = getDB();

  const result = await db.collection("authors").insertOne(author);

  return {
    collection: "authors",
    insertedId: result.insertedId,
  };
};

export const createCappedLogsCollection = async () => {
  const db = getDB();

  await db.createCollection("logs", {
    capped: true,
    size: 1024 * 1024,
  });

  return {
    collection: "logs",
    capped: true,
    size: 1024 * 1024,
  };
};

export const createBooksTitleIndex = async () => {
  const db = getDB();

  const indexName = await db.collection("books").createIndex({
    title: 1,
  });

  return {
    collection: "books",
    field: "title",
    index: indexName,
  };
};