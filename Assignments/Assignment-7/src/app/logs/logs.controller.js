import { createLogService } from "./logs.service.js";

import { successResponse } from "../../common/utils/successResponse.js";

export const createLog = async (req, res) => {
  const result = await createLogService(req.body);

  return successResponse(res, {
    statusCode: 201,
    message: "Log created successfully",
    data: result,
  });
};