const Cart = require("../models/Cart");
const Equipment = require("../models/Equipment");
const Order = require("../models/Order");

// Add Equipment to Cart
// exports.addToCart = async (req, res) => {
//   const { equipmentId, quantity, startDate, endDate } = req.body;

//   try {
//     let cart = await Cart.findOne({ user: req.user.id });

//     if (!cart) {
//       cart = new Cart({ user: req.user.id, equipment: [] });
//     }

//     const existingItemIndex = cart.equipment.findIndex(
//       (item) => item.equipmentId.toString() === equipmentId
//     );

//     if (existingItemIndex >= 0) {
//       cart.equipment[existingItemIndex].quantity += quantity;
//     } else {
//       cart.equipment.push({ equipmentId, quantity, startDate, endDate });
//     }

//     await cart.save();
//     res.status(200).json({ msg: "Equipment added to cart", cart });
//   } catch (err) {
//     res.status(500).json({ msg: "Error adding to cart", error: err.message });
//   }
// };

// exports.addToCart = async (req, res) => {
//   const { equipmentId, quantity, startDate, endDate } = req.body;

//   if (!startDate || !endDate) {
//     return res.status(400).json({ msg: "startDate and endDate are required." });
//   }

//   try {
//     let cart = await Cart.findOne({ user: req.user.id });

//     if (!cart) {
//       cart = new Cart({
//         user: req.user.id,
//         equipment: [],
//         startDate,
//         endDate,
//       });
//     } else {
//       cart.startDate = startDate; // Update startDate if needed
//       cart.endDate = endDate; // Update endDate if needed
//     }

//     const existingItemIndex = cart.equipment.findIndex(
//       (item) => item.equipmentId.toString() === equipmentId
//     );

//     if (existingItemIndex >= 0) {
//       cart.equipment[existingItemIndex].quantity += quantity;
//     } else {
//       cart.equipment.push({ equipmentId, quantity });
//     }

//     await cart.save();
//     res.status(200).json({ msg: "Equipment added to cart", cart });
//   } catch (err) {
//     res.status(500).json({ msg: "Error adding to cart", error: err.message });
//   }
// };

// exports.addToCart = async (req, res) => {
//   const { equipmentId, quantity, startDate, endDate } = req.body;

//   if (!startDate || !endDate) {
//     return res.status(400).json({ msg: "startDate and endDate are required." });
//   }

//   try {
//     let cart = await Cart.findOne({ user: req.user.id });

//     if (!cart) {
//       cart = new Cart({
//         user: req.user.id,
//         equipment: [],
//       });
//     }

//     const existingItemIndex = cart.equipment.findIndex(
//       (item) => item.equipmentId.toString() === equipmentId
//     );

//     if (existingItemIndex >= 0) {
//       // Update the quantity, startDate, and endDate of the existing equipment
//       cart.equipment[existingItemIndex].quantity += quantity;
//       cart.equipment[existingItemIndex].startDate = startDate;
//       cart.equipment[existingItemIndex].endDate = endDate;
//     } else {
//       // Add new equipment with startDate and endDate
//       cart.equipment.push({ equipmentId, quantity, startDate, endDate });
//     }

//     cart.updatedAt = Date.now(); // Update the updatedAt timestamp
//     await cart.save();
//     res.status(200).json({ msg: "Equipment added to cart", cart });
//   } catch (err) {
//     res.status(500).json({ msg: "Error adding to cart", error: err.message });
//   }
// };

exports.addToCart = async (req, res) => {
  const { equipmentId, quantity, startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res.status(400).json({ msg: "startDate and endDate are required." });
  }

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        equipment: [],
      });
    }

    // Check if the equipment already exists in the cart
    const existingItemIndex = cart.equipment.findIndex(
      (item) => item.equipmentId.toString() === equipmentId
    );

    if (existingItemIndex >= 0) {
      // Update the existing equipment item's quantity, startDate, and endDate
      cart.equipment[existingItemIndex].quantity += quantity;
      cart.equipment[existingItemIndex].startDate = startDate;
      cart.equipment[existingItemIndex].endDate = endDate;
    } else {
      // Add new equipment with startDate and endDate
      cart.equipment.push({
        equipmentId,
        quantity,
        startDate,
        endDate,
      });
    }

    // Update the updatedAt timestamp
    cart.updatedAt = Date.now();

    // Save the cart
    await cart.save();
    res.status(200).json({ msg: "Equipment added to cart", cart });
  } catch (err) {
    res.status(500).json({ msg: "Error adding to cart", error: err.message });
  }
};

// Get All Equipment in Cart
// exports.getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user.id }).populate(
//       "equipment.equipmentId"
//     );
//     if (!cart) {
//       return res.status(404).json({ msg: "Cart not found" });
//     }

//     res.status(200).json(cart);
//   } catch (err) {
//     res.status(500).json({ msg: "Error fetching cart", error: err.message });
//   }
// };

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "equipment.equipmentId"
    );
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const response = {
      _id: cart._id,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
      user: cart.user,
      equipments: cart.equipment.map((item) => ({
        _id: item._id,
        equipmentId: item.equipmentId._id,
        quantity: item.quantity,
        startDate: item.startDate,
        endDate: item.endDate,
        equipments: item.equipmentId, // Populated equipment details
      })),
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching cart", error: err.message });
  }
};

// Delete Equipment from Cart
exports.deleteFromCart = async (req, res) => {
  const { equipmentId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    cart.equipment = cart.equipment.filter(
      (item) => item.equipmentId.toString() !== equipmentId
    );

    await cart.save();
    res.status(200).json({ msg: "Equipment removed from cart", cart });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error removing from cart", error: err.message });
  }
};

// Place Order from Cart
exports.placeOrderFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "equipment.equipmentId"
    );

    if (!cart || cart.equipment.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    // Calculate total amount
    let totalAmount = 0;
    cart.equipment.forEach((item) => {
      totalAmount += item.equipmentId.dailyRate * item.quantity;
    });

    // Create Order
    const newOrder = new Order({
      user: req.user.id,
      equipment: cart.equipment.map((item) => ({
        equipmentId: item.equipmentId._id,
        quantity: item.quantity,
      })),
      totalAmount,
    });

    await newOrder.save();

    // Update equipment availability
    for (const item of cart.equipment) {
      await Equipment.findByIdAndUpdate(item.equipmentId._id, {
        $inc: { quantityAvailable: -item.quantity },
        status:
          item.equipmentId.quantityAvailable - item.quantity === 0
            ? "rented"
            : "available",
      });
    }

    // Clear cart
    await Cart.findOneAndDelete({ user: req.user.id });

    res.status(201).json({ msg: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ msg: "Error placing order", error: err.message });
  }
};

// Get Cart Item Count by User ID
exports.getCartItemCount = async (req, res) => {
  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
      // res.status(200).json({ userId: req.user.id, itemCount: 0 });
    }

    // Calculate the total item count
    const itemCount = cart.equipment.reduce(
      (total, item) => total + item.quantity,
      0
    );

    res.status(200).json({ userId: req.user.id, itemCount });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error fetching cart item count", error: err.message });
  }
};
