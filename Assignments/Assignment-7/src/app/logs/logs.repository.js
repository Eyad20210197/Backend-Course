import { getDB } from "../../common/db/connection.js";

export const insertLog = async (log) => {
  const db = getDB();

  const result = await db.collection("logs").insertOne(log);

  return {
    insertedId: result.insertedId,
  };
};