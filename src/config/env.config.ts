import dotenv from "dotenv";
dotenv.config();

export type NodeEnv = "development" | "production" | "test";

export type RedisMode = "sentinel" | "standalone";

export type Env = {
  DATABASE_URL: string;
  PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRY: string;
  NODE_ENV: NodeEnv;
  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
  REDIS_MASTER_NAME: string;
  REDIS_MODE: RedisMode;
};

function getEnv<T extends keyof Env>(key: T) {
  const value = process.env[key];
  if (!value && value != "") {
    throw new Error(`Env with key ${key} is missing.`);
  }
  return value;
}

export function initializeEnv() {
  const env: Env = {
    DATABASE_URL: getEnv("DATABASE_URL"),
    PORT: parseInt(getEnv("PORT"), 10),
    JWT_SECRET: getEnv("JWT_SECRET"),
    JWT_EXPIRY: getEnv("JWT_EXPIRY"),
    NODE_ENV: getEnv("NODE_ENV") as Env["NODE_ENV"],
    REDIS_HOST: getEnv("REDIS_HOST"),
    REDIS_PASSWORD: getEnv("REDIS_PASSWORD"),
    REDIS_PORT: getEnv("REDIS_PORT"),
    REDIS_USERNAME: getEnv("REDIS_USERNAME"),
    REDIS_MASTER_NAME: getEnv("REDIS_MASTER_NAME"),
    REDIS_MODE: getEnv("REDIS_MODE") as RedisMode,
  };

  globalThis._CONFIG = env;
  console.log("Environment variables initialized successfully.");
}
