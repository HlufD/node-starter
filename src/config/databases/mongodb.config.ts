import mongoose from "mongoose";

const RETRY_INTERVAL = 5000;

async function connectToMongoDb() {
  try {
    await mongoose.connect(globalThis._CONFIG.DATABASE_URL, {
      autoIndex: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Connection to MongoDB failed.", error);
    console.log(`Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
    setTimeout(connectToMongoDb, RETRY_INTERVAL);
  }

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB error:", err);
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("Connection to MongoDB closed.");
    process.exit(0);
  });
}

export { connectToMongoDb };
