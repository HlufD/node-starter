import { Redis } from "ioredis";
import { RedisClient } from "../config/databases/redis.config.js";

const redisClient: Redis = RedisClient.connect();

function serialize(value: unknown): string {
  return JSON.stringify(value);
}

function deserialize<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value as unknown as T;
  }
}

async function set(key: string, value: unknown, ttl?: number) {
  const val = serialize(value);
  if (ttl) await redisClient.set(key, val, "EX", ttl);
  else await redisClient.set(key, val);
}

async function get<T = unknown>(key: string): Promise<T | null> {
  const val = await redisClient.get(key);
  return deserialize(val);
}

const del = async (key: string): Promise<boolean> => {
  const res = await redisClient.del(key);
  return res === 1;
};

const exists = async (key: string): Promise<boolean> => {
  const res = await redisClient.exists(key);
  return res === 1;
};

export { set, get, del, exists };
