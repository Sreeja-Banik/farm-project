// controllers/orderController.js
const Order = require("../models/Order");
const Equipment = require("../models/Equipment");
const Cart = require("../models/Cart");

// Place Order
// exports.placeOrder = async (req, res) => {
//   try {
//     const { equipment } = req.body;
//     let totalAmount = 0;

//     for (const item of equipment) {
//       const equip = await Equipment.findById(item.equipmentId);
//       if (!equip)
//         return res
//           .status(404)
//           .json({ error: `Equipment not found: ${item.equipmentId}` });
//       if (equip.status !== "available")
//         return res
//           .status(400)
//           .json({ error: `Equipment not available: ${equip.name}` });
//       totalAmount += equip.dailyRate * item.quantity;
//     }

//     const order = new Order({ user: req.user.id, equipment, totalAmount });
//     await order.save();

//     for (const item of equipment) {
//       await Equipment.findByIdAndUpdate(item.equipmentId, { status: "rented" });
//     }

//     res.status(201).json({ message: "Order placed", order });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.placeOrder = async (req, res) => {
//   try {
//     // Ensure the user is authenticated
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ error: "User not authenticated" });
//     }

//     const {
//       equipment,
//       contactInfo,
//       deliveryInfo,
//       startDate,
//       endDate,
//       totalAmount,
//     } = req.body;

//     // Validate mandatory fields
//     if (!equipment || !contactInfo || !deliveryInfo || !startDate || !endDate) {
//       return res.status(400).json({
//         error:
//           "Equipment, contact info, delivery info, start date, and end date are required.",
//       });
//     }

//     // Calculate the total amount
//     // let totalAmount = 0;
//     for (const item of equipment) {
//       const equip = await Equipment.findById(item.equipmentId);
//       //   console.log(equip);
//       if (!equip) {
//         return res
//           .status(404)
//           .json({ error: `Equipment not found: ${item.equipmentId}` });
//       }
//       if (equip.status !== "available") {
//         return res
//           .status(400)
//           .json({ error: `Equipment not available: ${equip.name}` });
//       }
//       //   totalAmount += equip.dailyRate * item.quantity;
//     }

//     // Create a new order specific to the user
//     const order = new Order({
//       user: req.user.id, // Ensure the order is linked to the authenticated user
//       equipment,
//       totalAmount,
//       contactInfo,
//       deliveryInfo,
//       startDate,
//       endDate,
//     });
//     // console.log(order);

//     // await order.save();

//     // Update equipment status to "rented"
//     for (const item of equipment) {
//       await Equipment.findByIdAndUpdate(item.equipmentId, { status: "rented" });
//     }

//     res.status(201).json({ message: "Order placed successfully", order });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.placeOrder = async (req, res) => {
  const { cartId } = req.body; // Assuming cartId is sent in the request body
  const userId = req.user._id; // Assuming the user is authenticated and userId is in req.user

  try {
    // Find the cart by cartId and userId
    const cart = await Cart.findOne({ _id: cartId, user: userId }).populate(
      "equipment.equipmentId"
    );
    if (!cart) {
      return res
        .status(404)
        .json({ error: "Cart not found or does not belong to the user" });
    }

    // Array to store all orders created
    const orders = [];

    // Iterate through equipment in the cart
    for (const item of cart.equipment) {
      const { equipmentId, quantity, startDate, endDate } = item;

      // Calculate totalAmount for the equipment (you can modify this logic as needed)
      const equipment = item.equipmentId;
      const equipmentPricePerDay = equipment.dailyRate; // Assuming `pricePerDay` exists on the equipment
      const rentalDays = Math.ceil(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
      );
      // console.log(
      //   "equipmentPricePerDay",
      //   equipmentPricePerDay,
      //   "rentalDays",
      //   rentalDays,
      //   "quantity",
      //   quantity
      // );
      const totalAmount = rentalDays * equipmentPricePerDay * quantity;
      // const totalAmount = 2000;

      // Create an order for the current equipment
      const order = new Order({
        user: userId,
        equipment: [
          {
            equipmentId: equipment._id,
            quantity,
            startDate,
            endDate,
          },
        ],
        totalAmount,
        status: "pending",
        contactInfo: {
          name: req.body.contactInfo.name,
          phone: req.body.contactInfo.phone,
          email: req.body.contactInfo.email,
        },
        deliveryInfo: {
          address: req.body.deliveryInfo.address,
          city: req.body.deliveryInfo.city,
          state: req.body.deliveryInfo.state,
          zipCode: req.body.deliveryInfo.zipCode,
        },
      });

      // Save the order
      const savedOrder = await order.save();
      orders.push(savedOrder);
    }

    // Delete the cart after creating orders
    await Cart.findByIdAndDelete(cartId);

    // Respond with the list of created orders
    res.status(201).json({ message: "Order(s) placed successfully", orders });
  } catch (error) {
    console.error("Error placing order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while placing the order" });
  }
};

// Approve Order
exports.approveOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order approved", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject Order
exports.rejectOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order rejected", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("equipment.equipmentId");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching orders", error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "equipment.equipmentId"
    );
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching orders", error: err.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status: "canceled" },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order canceled", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const Equipment = require('../models/Equipment');
// const Order = require('../models/Order');

// // Order Equipment
// exports.orderEquipment = async (req, res) => {
//   const { equipment, totalAmount } = req.body;

//   try {
//     const newOrder = new Order({
//       user: req.user.id, // Assuming `req.user` contains authenticated user info
//       equipment,
//       totalAmount
//     });

//     await newOrder.save();

//     // Update equipment status
//     for (const item of equipment) {
//       await Equipment.findByIdAndUpdate(item.equipmentId, { $inc: { quantityAvailable: -item.quantity }, status: 'rented' });
//     }

//     res.status(201).json({ msg: 'Order placed successfully', order: newOrder });
//   } catch (err) {
//     res.status(500).json({ msg: 'Error placing order', error: err.message });
//   }
// };

// // Get All Orders
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate('user').populate('equipment.equipmentId');
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json({ msg: 'Error fetching orders', error: err.message });
//   }
// };

// // Approve Order
// exports.approveOrder = async (req, res) => {
//   try {
//     const order = await Order.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
//     if (!order) {
//       return res.status(404).json({ msg: 'Order not found' });
//     }
//     res.status(200).json({ msg: 'Order approved', order });
//   } catch (err) {
//     res.status(500).json({ msg: 'Error approving order', error: err.message });
//   }
// };

// // Reject Order
// exports.rejectOrder = async (req, res) => {
//   try {
//     const order = await Order.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
//     if (!order) {
//       return res.status(404).json({ msg: 'Order not found' });
//     }
//     res.status(200).json({ msg: 'Order rejected', order });
//   } catch (err) {
//     res.status(500).json({ msg: 'Error rejecting order', error: err.message });
//   }
// };
exports.getOrdersByProvider = async (req, res) => {
  const { providerId } = req.params;

  try {
    // Step 1: Find all equipment provided by the given provider
    const equipmentList = await Equipment.find({
      "provider.id": providerId,
    }).select("_id name");

    if (!equipmentList.length) {
      return res
        .status(404)
        .json({ message: "No equipment found for this provider" });
    }

    // Step 2: Extract equipment IDs
    const equipmentIds = equipmentList.map((equipment) => equipment._id);

    // Step 3: Find all orders containing the provider's equipment
    const orders = await Order.find({
      "equipment.equipmentId": { $in: equipmentIds },
    })
      .populate({
        path: "user",
        select: "name email phone", // Include user details
      })
      .populate({
        path: "equipment.equipmentId",
        select: "name dailyRate description", // Include equipment details
      })
      .sort({ createdAt: -1 }); // Sort by most recent orders

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this provider's equipment" });
    }

    // Step 4: Respond with orders
    res.status(200).json({
      message: "Orders fetched successfully",
      provider: providerId,
      equipment: equipmentList.map((equipment) => ({
        id: equipment._id,
        name: equipment.name,
      })),
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders for provider:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while fetching orders for the provider",
      });
  }
};
