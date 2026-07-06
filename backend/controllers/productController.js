import mongoose from "mongoose";
import Product from "../models/Product.js";
export const createProduct = async (req, res) => {
  try {
    const products = await req.body;
    await Product.create(products);
    res.status(200).json({
      message: "Product successfully created! ",
      products,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const getProduct = await Product.find();
    res.status(200).json({ message: "All product", getProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const getProductId = await Product.findById(id);
    if (!getProductId) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({ message: "ID get", getProductId });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
    );

    if (!updateProduct) {
      return res.status(404).json({ message: "Id not found" });
    }

    res
      .status(200)
      .json({ message: "product successfully update", updateProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Id not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
