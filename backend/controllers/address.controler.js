import Address from "../models/Address.js";

// Save Address
export const saveAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);

    res.status(201).json({
      success: true,
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged User Address
export const getUserAddress = async (req, res) => {
  try {
    const address = await Address.find({ userId: req.params.userId });

    res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
