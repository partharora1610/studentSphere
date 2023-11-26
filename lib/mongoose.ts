import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_DB_URL) {
    throw new Error("MONGO_URI is not defined");
  }

  if (isConnected) {
    console.log("=> using existing database connection");
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      // dbName: process.env.MONGO_DB_NAME,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
