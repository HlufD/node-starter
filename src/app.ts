import express from "express";
import { globalErrorHandler } from "./middlewares/error-handler.middleware.js";
import { composeRouts } from "./config/router.config.js";

export function bootstrap() {
  const routes = composeRouts();
  const app = express();

  app.use(express.json());

  app.use("/api/v1/", routes);

  app.use(globalErrorHandler);

  app.listen(globalThis._CONFIG.PORT, () => {
    console.log(
      `Server running at http://localhost:${globalThis._CONFIG.PORT}`,
    );
  });
}
