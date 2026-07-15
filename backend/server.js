import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
//connecting databse
connectDB();

app.use("/api/auth", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.listen(5000, () => {
  console.log("Server is working properly");
});
