import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      const newCart = new Cart({
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
    }
    if (item) {
      item.quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }
    await newCart.save();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
