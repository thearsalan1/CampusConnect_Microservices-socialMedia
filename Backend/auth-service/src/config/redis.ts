import { Redis } from "ioredis";

export const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

connection.on("connect", () => {
  console.log("Redis connected");
});

connection.on("error", (err) => {
  if (err.message !== "read ECONNRESET") {
    console.log("Redis error: ", err);
  }
});
