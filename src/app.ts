import express from "express";
import { globalErrorHandler } from "./middlewares/error-handler.middelware.js";

export function bootstrap() {
  const app = express();
  app.use(express.json());
  app.use(globalErrorHandler)

  app.listen(globalThis._CONFIG.PORT, () => {
    console.log(
      `Server running at http://localhost:${globalThis._CONFIG.PORT}`,
    );
  });
}

