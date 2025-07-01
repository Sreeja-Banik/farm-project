// models/Equipment.js
const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  dailyRate: { type: Number, required: true },
  imageUrl: { type: String },
  additionalImages: { type: [String] },
  status: {
    type: String,
    enum: ["available", "rented", "maintenance"],
    default: "available",
  },
  createdAt: { type: Date, default: Date.now },
  serviceAreas: { type: [String] },
  quantity: { type: Number, required: true },
  quantityAvailable: { type: Number, required: true },
  provider: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String },
    contact: { type: String },
  },
  availabilitySchedule: [
    {
      startDate: { type: Date },
      endDate: { type: Date },
    },
  ],
  specifications: {
    power: { type: String },
    weight: { type: String },
    width: { type: String },
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Equipment", equipmentSchema);
