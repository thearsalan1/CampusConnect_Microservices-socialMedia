import { Redis } from "ioredis";

export const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
  connectTimeout: 10000,
  commandTimeout: 5000,
  keepAlive: 10000,
});

connection.on("connect", () => {
  console.log("Redis connected");
});

connection.on("error", (err) => {
  if (err.message !== "read ECONNRESET") {
    console.log("Redis error: ", err);
  }
});
