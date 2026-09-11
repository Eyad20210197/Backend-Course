import { getDB } from "../../common/db/connection.js";

export const insertBook = async (book) => {
  const db = getDB();

  const result = await db.collection("books").insertOne(book);

  return {
    insertedId: result.insertedId,
  };
};

export const insertBooks = async (books) => {
  const db = getDB();

  const result = await db.collection("books").insertMany(books);

  return {
    insertedIds: result.insertedIds,
    insertedCount: result.insertedCount,
  };
};

export const updateBookByTitle = async (title, updateData) => {
  const db = getDB();

  const result = await db.collection("books").findOneAndUpdate(
    { title },
    { $set: updateData },
    { returnDocument: "after" }
  );

  return result;
};

export const findBookByTitle = async (title) => {
  const db = getDB();

  return db.collection("books").findOne({
    title,
  });
};

export const findBooksByYearRange = async (from, to) => {
  const db = getDB();

  return db
    .collection("books")
    .find({
      year: {
        $gte: from,
        $lte: to,
      },
    })
    .toArray();
};

export const findBooksByGenre = async (genre) => {
  const db = getDB();

  return db
    .collection("books")
    .find({
      genres: genre,
    })
    .toArray();
};

export const findBooksWithSkipLimit = async () => {
  const db = getDB();

  return db
    .collection("books")
    .find({})
    .sort({ year: -1 })
    .skip(2)
    .limit(3)
    .toArray();
};

export const findBooksWithIntegerYear = async () => {
  const db = getDB();

  return db
    .collection("books")
    .find({
      year: {
        $type: "int",
      },
    })
    .toArray();
};

export const findBooksExcludingGenres = async (genres) => {
  const db = getDB();

  return db
    .collection("books")
    .find({
      genres: {
        $nin: genres,
      },
    })
    .toArray();
};

export const deleteBooksBeforeYear = async (year) => {
  const db = getDB();

  const result = await db.collection("books").deleteMany({
    year: {
      $lt: year,
    },
  });

  return {
    deletedCount: result.deletedCount,
  };
};

export const aggregateBooksAfterYear = async (year) => {
  const db = getDB();

  return db
    .collection("books")
    .aggregate([
      {
        $match: {
          year: {
            $gt: year,
          },
        },
      },
      {
        $sort: {
          year: -1,
        },
      },
    ])
    .toArray();
};

export const aggregateBooksWithProjection = async (year) => {
  const db = getDB();

  return db
    .collection("books")
    .aggregate([
      {
        $match: {
          year: {
            $gt: year,
          },
        },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          author: 1,
          year: 1,
        },
      },
    ])
    .toArray();
};

export const aggregateBooksWithUnwind = async () => {
  const db = getDB();

  return db
    .collection("books")
    .aggregate([
      {
        $unwind: "$genres",
      },
    ])
    .toArray();
};

export const aggregateBooksWithLogs = async () => {
  const db = getDB();

  return db
    .collection("books")
    .aggregate([
      {
        $lookup: {
          from: "logs",
          localField: "title",
          foreignField: "bookTitle",
          as: "logs",
        },
      },
    ])
    .toArray();
};