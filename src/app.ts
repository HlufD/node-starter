import express from "express";

export function bootstrap() {
  const app = express();

  app.use(express.json());

  app.listen(globalThis._CONFIG.PORT, () => {
    console.log(
      `Server running at http://localhost:${globalThis._CONFIG.PORT}`,
    );
  });
}

