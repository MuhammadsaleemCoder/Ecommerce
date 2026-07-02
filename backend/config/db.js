import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("Database connected successfully! "));
  } catch (error) {
    console.log("error to connecting database", error.message);
  }
};
