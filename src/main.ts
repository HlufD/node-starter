import { bootstrap } from "./app.js";
import { connectToMongoDb } from "./config/databases/mongodb.config.js";
import { initializeEnv } from "./config/env.config.js";

async function main() {
  void initializeEnv();
  void (await connectToMongoDb());
  bootstrap();
}

main();
