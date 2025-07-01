// const express = require("express");
// const {
//   orderEquipment,
//   getAllOrders,
//   approveOrder,
//   rejectOrder,
// } = require("../controllers/orderController");
// const router = express.Router();

// // Order Routes
// router.post("/", orderEquipment); // Place an order
// router.get("/", getAllOrders); // Get all orders
// router.put("/:id/approve", approveOrder); // Approve an order
// router.put("/:id/reject", rejectOrder); // Reject an order

// module.exports = router;

const express = require("express");
const router = express.Router();
// const orderController = require("../controllers/orderController");
const { authenticate, authorize } = require("../middleware/auth");
const {
  placeOrder,
  approveOrder,
  rejectOrder,
  getUserOrders,
  getAllOrders,
  cancelOrder,
  getOrdersByProvider,
} = require("../controllers/orderController");
// Place Order
// router.post("/", authenticate, placeOrder);
router.post("/", authenticate, placeOrder);

// Admin Actions on Orders
router.put("/approve/:id", authenticate, authorize("admin"), approveOrder);
router.put("/reject/:id", authenticate, authorize("admin"), rejectOrder);

// User Orders
router.get("/", authenticate, getUserOrders);
router.put("/:id/cancel", authenticate, cancelOrder);
router.get("/all", authenticate, authorize("admin"), getAllOrders);
router.get(
  "/provider/:providerId",
  authenticate,
  authorize("admin", "provider"),
  getAllOrders
);

module.exports = router;
