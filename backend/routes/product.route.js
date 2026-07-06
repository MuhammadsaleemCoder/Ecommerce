import express from "express";
import {
  createProduct,
  getAllProduct,
  deleteProduct,
  updateProduct,
  getProductId,
} from "../controllers/productController.js";
const router = express.Router();

router.post("/create", createProduct);
router.get("/all", getAllProduct);
router.get("/:id", getProductId);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
