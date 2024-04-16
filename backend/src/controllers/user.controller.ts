import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";
import { userService } from "../services";

/**
 * Save a user by username.
 * @param {Request} req - Express request object containing the username in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} Promise that resolves to an Express response object.
 */
const saveUser = catchAsync(async (req: Request, res: Response) => {
  const { username } = req.params;
  const user = await userService.saveUser(username);
  return res.status(httpStatus.OK).send(user);
});

export { saveUser };
