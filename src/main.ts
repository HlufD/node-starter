import { bootstrap } from "./app.js";
import { initializeEnv } from "./config/env.config.js";

function main() {
  initializeEnv();
  bootstrap();
}

main();
