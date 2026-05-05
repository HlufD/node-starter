import { Router } from "express";
import userController from "./user.controller.js";

const userRouter = Router();

userRouter.get("/users", userController.sayHello);

export { userRouter };
