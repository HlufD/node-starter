import { Redis, RedisOptions } from "ioredis";

export class RedisClient {
  public static instance: Redis | null = null;

  static connect(): Redis {
    if (!this.instance) {
      const _CONFIG = globalThis._CONFIG;

      let options: RedisOptions;

      const redisHosts = _CONFIG.REDIS_HOST.split(",");

      const sentinelHosts: { host: string; port: number }[] = redisHosts.map(
        (host) => {
          return { host: host.trim(), port: Number(_CONFIG.REDIS_PORT) };
        },
      );

      switch (_CONFIG.REDIS_MODE) {
        case "sentinel":
          options = {
            sentinels: sentinelHosts,
            username: _CONFIG.REDIS_USERNAME,
            password: _CONFIG.REDIS_PASSWORD,
            name: _CONFIG.REDIS_MASTER_NAME,

            retryStrategy(times) {
              return Math.min(times * 100, 3000);
            },

            maxRetriesPerRequest: 3,
            enableOfflineQueue: false,

            reconnectOnError(err) {
              const recoverable = ["READONLY", "ECONNRESET", "ETIMEDOUT"];
              return recoverable.some((e) => err.message.includes(e));
            },
          };
          break;

        default:
          options = {
            host: redisHosts[0],
            port: Number(_CONFIG.REDIS_PORT),
            password: _CONFIG.REDIS_PASSWORD,

            retryStrategy(times) {
              return Math.min(times * 100, 3000);
            },
          };
          break;
      }

      this.instance = new Redis(options);

      this.instance.on("ready", () => {
        console.log(`Redis ready (${_CONFIG.NODE_ENV})`);
      });

      this.instance.on("connect", () => {
        console.log(
          `Successfully connected to Redis ${_CONFIG.NODE_ENV} Environment`,
        );
      });

      this.instance.on("error", (err: unknown) => {
        console.error(
          `Redis connection error on ${_CONFIG.NODE_ENV} Environment: `,
          err,
        );
      });

      this.instance.on("reconnecting", () => {
        console.log("Redis reconnecting...");
      });

      this.instance.on("close", () => {
        console.log("Redis connection closed");
      });
    }

    return this.instance;
  }
}
