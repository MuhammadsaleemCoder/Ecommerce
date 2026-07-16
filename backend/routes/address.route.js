import express from "express";
import {
  saveAddress,
  getUserAddress,
} from "../controllers/address.controler.js";

const router = express.Router();

router.post("/", saveAddress);
router.get("/:userId", getUserAddress);

export default router;
