import { config } from "dotenv";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const NODE_ENV_VALUE = process.env.NODE_ENV ?? "development";
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const environmentFile = resolve(projectRoot, `.env.${NODE_ENV_VALUE}`);
config({
    path: existsSync(environmentFile) ? environmentFile : resolve(projectRoot, ".env"),
    quiet: true,
});

export const NODE_ENV = NODE_ENV_VALUE;
export const SERVER_PORT = Number.parseInt(
    process.env.SERVER_PORT ?? process.env.PORT ?? "3000",
    10,
);
export const DB_PORT = parseInt(process.env.DB_PORT);
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_NAME = process.env.DB_NAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
