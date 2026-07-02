import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
//connecting databse
connectDB();
app.listen(5001, () => {
  console.log("Server is working properly");
});
