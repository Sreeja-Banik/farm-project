// const express = require("express");
// const router = express.Router();
// const userController = require("../controllers/userController");
// const { authenticate, authorize } = require("../middleware/auth");

// // Public Routes
// router.post("/signup", userController.signup);
// router.post("/login", userController.login);

// // Admin Routes
// router.put(
//   "/approve/:id",
//   authenticate,
//   authorize("admin"),
//   userController.approveUser
// );
// router.put(
//   "/reject/:id",
//   authenticate,
//   authorize("admin"),
//   userController.rejectUser
// );
// router.post("/", authenticate, authorize("admin"), userController.addUser);

// // User Address
// router.post("/address", authenticate, userController.addAddress);
// router.get("/address", authenticate, userController.getAddress);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const {
  signup,
  login,
  approveUser,
  rejectUser,
  addAddress,
  getAddress,
  getProviderList,
  getAddressByUserId,
  addDeliveryAddress,
  editUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

// Routes
router.post("/signup", signup); // Signup route
router.post("/login", login); // Login route
router.put("/approve/:id", approveUser);
//router.put("/approve/:id", authenticate, authorize("admin"), approveUser); // Approve user
router.put("/reject/:id", rejectUser);
//router.put("/reject/:id", authenticate, authorize("admin"), rejectUser); // Reject user
// router.put("/edit/:id", authenticate, authorize("admin"), editUser);
router.put("/edit/:id", authenticate, authorize("admin"), editUser);
router.post("/address", authenticate, addAddress); // Add address
router.get("/address", authenticate, getAddress); // Get address

router.get("/providers", authenticate, authorize("admin"), getProviderList); // Get provider list (Admin only)
router.get("/address/:id", authenticate, getAddressByUserId); // Get address by user ID
router.post("/delivery-address", authenticate, addDeliveryAddress); // Add delivery address details for a user
// get all user only admin
router.get("/", authenticate, authorize("admin"), getAllUsers);
router.delete("/:id", authenticate, authorize("admin"), deleteUser);

module.exports = router;
