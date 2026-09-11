import "dotenv/config";

const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT) || 3000,

  mongoUri: process.env.MONGO_URI,

  mongoDbName: process.env.MONGO_DB_NAME,
};

if (!env.mongoUri) {
  throw new Error("MONGO_URI is required");
}

if (!env.mongoDbName) {
  throw new Error("MONGO_DB_NAME is required");
}

export default env;