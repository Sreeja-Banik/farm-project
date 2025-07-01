// models/User.js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
});

const orderAddressSchema = new mongoose.Schema({
  personalDetails: {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  deliveryAddress: addressSchema,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: addressSchema,
  role: { type: String, enum: ["admin", "user", "provider"], default: "user" }, //--
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  orderAddress: orderAddressSchema,
});

module.exports = mongoose.model("User", userSchema);
