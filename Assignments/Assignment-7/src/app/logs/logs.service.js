import { insertLog } from "./logs.repository.js";

export const createLogService = async (log) => {
  return insertLog(log);
};