import { Router, Express } from "express";
import { userRouter } from "../modules/users/users.route.js";

function composeRouts(): Router {
  const router = Router();

  router.use(userRouter);

  return router;
}

export { composeRouts };
