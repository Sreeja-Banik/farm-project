// const express = require("express");
// const router = express.Router();
// const equipmentController = require("../controllers/equipmentController");
// const { authenticate, authorize } = require("../middleware/auth");
// const upload = require("../utils/upload"); // Middleware for handling image uploads

// // Equipment CRUD
// router.get("/", equipmentController.getAllEquipment);
// router.get("/:id", equipmentController.getEquipmentById);
// router.post(
//   "/",
//   authenticate,
//   authorize("admin", "provider"),
//   upload.single("image"),
//   equipmentController.createEquipment
// );
// router.put(
//   "/:id",
//   authenticate,
//   authorize("admin", "provider"),
//   equipmentController.updateEquipment
// );
// router.delete(
//   "/:id",
//   authenticate,
//   authorize("admin"),
//   equipmentController.deleteEquipment
// );

// // Equipment Reviews
// router.post("/:id/reviews", authenticate, equipmentController.addReview);
// router.get("/:id/reviews", equipmentController.getReviews);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  //   updateEquipment,
  editEquipment,
  deleteEquipment,
  addReview,
  //   getReviews,
  getAllReviews,
  getEquipmentByProviderId,
} = require("../controllers/equipmentController");

// Equipment Routes
router.get("/", getAllEquipment); // Get all equipment
router.get("/:id", getEquipmentById); // Get equipment by ID

router.post("/", authenticate, authorize("admin", "provider"), createEquipment); // Create equipment
// router.post("/", (req, res) => {
//   console.log(req.body);
// });
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

router.put("/:id", authenticate, authorize("admin", "provider"), editEquipment); // Update equipment
router.get(
  "/provider/:providerId",
  authenticate,
  authorize("admin", "provider"),
  getEquipmentByProviderId
); // Get equipment by provider ID
router.delete(
  "/:id",
  authenticate,
  authorize("admin", "provider"),
  deleteEquipment
); // Delete equipment
router.post("/:id/reviews", authenticate, addReview); // Add review to equipment
router.get("/:id/reviews", getAllReviews); // Get reviews for equipment

module.exports = router;
