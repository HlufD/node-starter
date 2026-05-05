import { Request, Response } from "express";
import userService from "./user.service.js";
import { HttpStatusCode } from "../../lib/custom-error.lib.js";

async function sayHello(request: Request, res: Response) {
  const response = userService.sayHello();
  return res.status(HttpStatusCode.OK).json(response);
}

export default {
  sayHello,
};
