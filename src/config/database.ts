import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
          try {
                    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/uptime-monitor';
                    await mongoose.connect(mongoUri);
          } catch (error) {
                    console.error(`MongoDB connection error:`, error);
                    process.exit(1);
          }
};