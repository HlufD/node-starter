import dotenv from "dotenv"
dotenv.config()

export type Env = {
  DATABASE_URL: string;
  PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRY: string;
  NODE_ENV: "development" | "production" | "test" |string;
};

function getEnv<T extends keyof Env>(key: T) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Env with key ${key} is missing.`);
  }
  return value;
}


export function initializeEnv() {
  const env : Env =  {
    DATABASE_URL: getEnv("DATABASE_URL"),
    PORT: parseInt(getEnv("PORT"), 10),
    JWT_SECRET: getEnv("JWT_SECRET"),
    JWT_EXPIRY: getEnv("JWT_EXPIRY"),
    NODE_ENV: getEnv("NODE_ENV") as Env["NODE_ENV"],
  };

  globalThis._CONFIG = env;
  console.log("Environment variables initialized successfully.");
}
