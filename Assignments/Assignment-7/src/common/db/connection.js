import { MongoClient } from "mongodb";
import env from "../../config/env.js";

const client = new MongoClient(env.mongoUri);

let db;

export async function connectDB() {
  await client.connect();

  db = client.db(env.mongoDbName);

  console.log("MongoDB connected successfully to ", env.mongoDbName);

  return db;
}

export function getDB() {
  if (!db) {
    throw new Error("Database is not connected to " , env.mongoDbName);
  }

  return db;
}