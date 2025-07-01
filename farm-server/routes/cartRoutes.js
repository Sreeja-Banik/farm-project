const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authenticate } = require("../middleware/auth");

// Cart Operations
router.post("/add", authenticate, cartController.addToCart);
router.get("/", authenticate, cartController.getCart);
router.delete("/:equipmentId", authenticate, cartController.deleteFromCart);

// Place Order from Cart
router.post("/checkout", authenticate, cartController.placeOrderFromCart);
router.get("/count", authenticate, cartController.getCartItemCount);

module.exports = router;
