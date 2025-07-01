// // controllers/equipmentController.js
// const Equipment = require("../models/Equipment");

// // Get All Equipment
// exports.getAllEquipment = async (req, res) => {
//   try {
//     const equipment = await Equipment.find();
//     res.json(equipment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get Equipment by ID
// exports.getEquipmentById = async (req, res) => {
//   try {
//     const equipment = await Equipment.findById(req.params.id);
//     if (!equipment)
//       return res.status(404).json({ error: "Equipment not found" });
//     res.json(equipment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Create Equipment
// exports.createEquipment = async (req, res) => {
//   try {
//     const equipment = new Equipment(req.body);
//     if (req.file) equipment.imageUrl = req.file.path;
//     await equipment.save();
//     res.status(201).json({ message: "Equipment created", equipment });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update Equipment
// exports.updateEquipment = async (req, res) => {
//   try {
//     const equipment = await Equipment.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!equipment)
//       return res.status(404).json({ error: "Equipment not found" });
//     res.json({ message: "Equipment updated", equipment });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete Equipment
// exports.deleteEquipment = async (req, res) => {
//   try {
//     const equipment = await Equipment.findByIdAndDelete(req.params.id);
//     if (!equipment)
//       return res.status(404).json({ error: "Equipment not found" });
//     res.json({ message: "Equipment deleted" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Add Review
// exports.addReview = async (req, res) => {
//   try {
//     const { rating, comment } = req.body;
//     const equipment = await Equipment.findById(req.params.id);
//     if (!equipment)
//       return res.status(404).json({ error: "Equipment not found" });

//     const review = { user: req.user.id, rating, comment, date: new Date() };
//     equipment.reviews.push(review);
//     await equipment.save();
//     res.json({ message: "Review added", reviews: equipment.reviews });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const Equipment = require("../models/Equipment");

// Get all equipment
exports.getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.status(200).json(equipment);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error fetching equipment", error: err.message });
  }
};

// Get equipment by ID
exports.getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ msg: "Equipment not found" });
    }
    res.status(200).json(equipment);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error fetching equipment", error: err.message });
  }
};

// Create equipment with image upload
// exports.createEquipment = async (req, res) => {
//   const {
//     name,
//     description,
//     category,
//     dailyRate,
//     additionalImages,
//     status,
//     serviceAreas,
//     quantity,
//     quantityAvailable,
//     provider,
//     availabilitySchedule,
//     availableFrom,
//     availableTo,
//     specifications,
//   } = req.body;

//   try {
//     const newEquipment = new Equipment({
//       name,
//       description,
//       category,
//       dailyRate,
//       imageUrl: req.file ? req.file.path : "", // Path of the uploaded image
//       additionalImages: additionalImages ? additionalImages.split(",") : [],
//       status,
//       serviceAreas: serviceAreas ? serviceAreas.split(",") : [],
//       quantity,
//       quantityAvailable,
//       provider: JSON.parse(provider),
//       availabilitySchedule: JSON.parse(availabilitySchedule),
//       availableFrom,
//       availableTo,
//       specifications: JSON.parse(specifications),
//     });

//     await newEquipment.save();
//     res.status(201).json(newEquipment);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ msg: "Error creating equipment", error: err.message });
//   }
// };

// exports.createEquipment = async (req, res) => {
//   console.log(req);
//   const {
//     name,
//     description,
//     category,
//     dailyRate,
//     status,
//     serviceAreas,
//     quantity,
//     quantityAvailable,
//     provider,
//     availabilitySchedule,
//     availableFrom,
//     availableTo,
//     specifications,
//   } = req.body;

//   try {
//     const newEquipment = new Equipment({
//       name,
//       description,
//       category,
//       dailyRate,
//       imageUrl: req.file ? req.file.path : "", // Single image upload
//       additionalImages: req.files ? req.files.map((file) => file.path) : [], // Multiple images
//       status,
//       serviceAreas: serviceAreas ? serviceAreas.split(",") : [],
//       quantity,
//       quantityAvailable,
//       provider: provider ? JSON.parse(provider) : {},
//       availabilitySchedule: availabilitySchedule
//         ? JSON.parse(availabilitySchedule)
//         : [],
//       availableFrom,
//       availableTo,
//       specifications: specifications ? JSON.parse(specifications) : {},
//     });

//     await newEquipment.save();
//     res.status(201).json(newEquipment);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ msg: "Error creating equipment", error: err.message });
//   }
// };

// exports.createEquipment = async (req, res) => {
//   console.log(req.body);
//   const {
//     name,
//     description,
//     category,
//     dailyRate,
//     status,
//     serviceAreas,
//     quantity,
//     quantityAvailable,
//     provider,
//     availabilitySchedule,
//     availableFrom,
//     availableTo,
//     specifications,
//   } = req.body;

//   try {
//     const newEquipment = new Equipment({
//       name,
//       description,
//       category,
//       dailyRate,
//       imageUrl: req.file ? req.file.path : "", // Single image upload
//       additionalImages: req.files ? req.files.map((file) => file.path) : [], // Multiple images
//       status,
//       serviceAreas: serviceAreas || [], // Service areas can be an array already
//       quantity,
//       quantityAvailable,
//       provider: provider || {}, // No need to parse provider
//       availabilitySchedule: availabilitySchedule || [], // No need to parse availabilitySchedule
//       availableFrom,
//       availableTo,
//       specifications: specifications || {}, // Handle specifications if provided
//     });

//     await newEquipment.save();
//     res.status(201).json(newEquipment);
//   } catch (err) {
//     // console.error("Error creating equipment:", err);
//     res
//       .status(500)
//       .json({ msg: "Error creating equipment", error: err.message });
//   }
// };

// exports.createEquipment = async (req, res) => {
//   console.log(req.body);
//   const {
//     name,
//     description,
//     category,
//     dailyRate,
//     imageUrl, // Accept image URL as a string
//     additionalImages,
//     status,
//     serviceAreas,
//     quantity,
//     quantityAvailable,
//     provider,
//     availabilitySchedule,
//     availableFrom,
//     availableTo,
//     specifications,
//   } = req.body;

//   try {
//     const newEquipment = new Equipment({
//       name,
//       description,
//       category,
//       dailyRate,
//       imageUrl, // Use the image URL directly
//       // additionalImages: additionalImages ? additionalImages.split(",") : [],
//       status,
//       serviceAreas: JSON.parse(serviceAreas),
//       // serviceAreas.split(",") :
//       quantity,
//       quantityAvailable,
//       provider: JSON.parse(provider),
//       availabilitySchedule: JSON.parse(availabilitySchedule),
//       availableFrom,
//       availableTo,
//       specifications: JSON.parse(specifications),
//     });

//     await newEquipment.save();
//     res.status(201).json(newEquipment);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ msg: "Error creating equipment", error: err.message });
//   }
// };

exports.createEquipment = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      dailyRate,
      imageUrl,
      additionalImages,
      status,
      serviceAreas,
      quantity,
      provider,
      availabilitySchedule,
      specifications,
    } = req.body;

    if (!name || !dailyRate || !quantity || !provider?.id) {
      return res.status(400).json({
        error: "Name, dailyRate, quantity, and provider ID are required.",
      });
    }

    const quantityAvailable = quantity; // Initially all quantity is available

    const newEquipment = new Equipment({
      name,
      description,
      category,
      dailyRate,
      imageUrl,
      additionalImages,
      status,
      serviceAreas,
      quantity,
      quantityAvailable,
      provider,
      availabilitySchedule,
      specifications,
    });

    const savedEquipment = await newEquipment.save();

    res.status(201).json({
      message: "Equipment added successfully",
      equipment: savedEquipment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add equipment." });
  }
};
// Edit equipment
// exports.editEquipment = async (req, res) => {
//   const {
//     name,
//     description,
//     category,
//     dailyRate,
//     additionalImages,
//     status,
//     serviceAreas,
//     quantity,
//     quantityAvailable,
//     provider,
//     availabilitySchedule,
//     availableFrom,
//     availableTo,
//     specifications,
//   } = req.body;

//   try {
//     const equipment = await Equipment.findById(req.params.id);
//     if (!equipment) {
//       return res.status(404).json({ msg: "Equipment not found" });
//     }

//     // Update fields
//     equipment.name = name || equipment.name;
//     equipment.description = description || equipment.description;
//     equipment.category = category || equipment.category;
//     equipment.dailyRate = dailyRate || equipment.dailyRate;
//     equipment.imageUrl = req.file ? req.file.path : equipment.imageUrl;
//     equipment.additionalImages = additionalImages
//       ? additionalImages.split(",")
//       : equipment.additionalImages;
//     equipment.status = status || equipment.status;
//     equipment.serviceAreas = serviceAreas
//       ? serviceAreas.split(",")
//       : equipment.serviceAreas;
//     equipment.quantity = quantity || equipment.quantity;
//     equipment.quantityAvailable =
//       quantityAvailable || equipment.quantityAvailable;
//     equipment.provider = provider ? JSON.parse(provider) : equipment.provider;
//     equipment.availabilitySchedule = availabilitySchedule
//       ? JSON.parse(availabilitySchedule)
//       : equipment.availabilitySchedule;
//     equipment.availableFrom = availableFrom || equipment.availableFrom;
//     equipment.availableTo = availableTo || equipment.availableTo;
//     equipment.specifications = specifications
//       ? JSON.parse(specifications)
//       : equipment.specifications;

//     await equipment.save();
//     res.status(200).json(equipment);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ msg: "Error updating equipment", error: err.message });
//   }
// };

exports.editEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const equipment = await Equipment.findById(id);

    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found." });
    }

    // Ensure quantityAvailable does not exceed quantity
    if (updateData.quantity && updateData.quantityAvailable) {
      if (updateData.quantityAvailable > updateData.quantity) {
        return res.status(400).json({
          error: "Quantity available cannot exceed total quantity.",
        });
      }
    }

    Object.assign(equipment, updateData);
    const updatedEquipment = await equipment.save();

    res.status(200).json({
      message: "Equipment updated successfully",
      equipment: updatedEquipment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update equipment." });
  }
};

// Delete equipment
exports.deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!equipment) {
      return res.status(404).json({ msg: "Equipment not found" });
    }
    res.status(200).json({ msg: "Equipment deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error deleting equipment", error: err.message });
  }
};

// Add a review
exports.addReview = async (req, res) => {
  const { user, rating, comment } = req.body;

  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ msg: "Equipment not found" });
    }

    const newReview = { user, rating, comment };
    equipment.reviews.push(newReview);

    await equipment.save();
    res
      .status(201)
      .json({ msg: "Review added successfully", review: newReview });
  } catch (err) {
    res.status(500).json({ msg: "Error adding review", error: err.message });
  }
};

// Get all reviews for an equipment
exports.getAllReviews = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ msg: "Equipment not found" });
    }
    res.status(200).json(equipment.reviews);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching reviews", error: err.message });
  }
};

// Get equipment by provider ID
exports.getEquipmentByProviderId = async (req, res) => {
  try {
    const { providerId } = req.params; // Extract provider ID from the route params
    const equipment = await Equipment.find({ "provider.id": providerId }); // Query equipment by provider ID
    if (!equipment || equipment.length === 0) {
      return res
        .status(404)
        .json({ msg: "No equipment found for this provider" });
    }
    res.status(200).json(equipment);
  } catch (err) {
    res.status(500).json({
      msg: "Error fetching equipment by provider",
      error: err.message,
    });
  }
};
