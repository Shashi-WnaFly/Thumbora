import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

redis.on("connect", () => {
  console.log("Redis Connected");
});

redis.on("error", (err: Error) => {
  console.error(err);
});

export default redis;
