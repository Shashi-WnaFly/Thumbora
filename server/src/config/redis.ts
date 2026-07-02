import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_HOST || "redis://localhost:6379");

redis.on("connect", () => {
  console.log("Redis Connected");
});

redis.on("error", (err: Error) => {
  console.error(err);
});

export default redis;
