import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            product: productId,
            quantity: 1,
          },
        ],
      });
    } else {
      const item = cart.items.find(
        (item) => item.product.toString() === productId,
      );

      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({
          product: productId,
          quantity: 1,
        });
      }
    }

    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
export const removeToCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter((i) => i.product.toString() !== productId);

    await cart.save();

    res.status(200).json({
      message: "Item removed successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find((i) => i.product.toString() === productId);

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      message: "Quantity updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.product");
    res.json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
