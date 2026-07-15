import express from "express";
const router = express.Router();
import {
  addToCart,
  removeToCart,
  updateQuantity,
  getCart,
} from "../controllers/cart.controller.js";

router.post("/add", addToCart);
router.post("/remove", removeToCart);
router.post("/update", updateQuantity);
router.get("/:userId", getCart);

export default router;
