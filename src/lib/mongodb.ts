import mongoose from "mongoose";
import { config } from "@/utils/config";

let cached = (global as any).mongoose || { conn: null, promise: null };

/**
 * Establishes a connection to MongoDB.
 * Uses a cached connection to prevent re-connections in a serverless environment.
 */
export async function connectToDatabase() {
    if (cached.conn) {
        console.log("✅ Using existing MongoDB connection.");
        return cached.conn;
    }

    if (!config.mongo_url) {
        throw new Error("❌ MongoDB connection URL is missing.");
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(config.mongo_url, {
            bufferCommands: false,
        })
            .then((mongoose) => {
                console.log("✅ MongoDB connected successfully!");
                return mongoose;
            })
            .catch((error) => {
                console.error("❌ MongoDB connection failed:", error);
                throw error;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
