import mongoose, { mongo, Types } from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  productId: [
    {
      items: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Cart", cartSchema);
