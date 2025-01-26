import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const uri: string = process.env.MONGODB_URI || "mongodb://localhost:27017/TypescriptApp"; 


function connectToMongoDB(): void {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error: Error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
}

export default connectToMongoDB;
