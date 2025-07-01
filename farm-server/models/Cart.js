// models/Cart.js
// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   equipment: [
//     {
//       equipmentId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Equipment",
//         required: true,
//       },
//       quantity: { type: Number, required: true, default: 1 },
//     },
//   ],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
// });

// module.exports = mongoose.model("Cart", cartSchema);

// {
//   _id:"",
//   createdAt:"",
//   updatedAt:"",
//   user:"",
//   equipments:[
//     {
//       _id:"",
//       equipmentId:"",
//       quantity:"",
//       startDate:"",
//       endDate:"",
//       equipments:{}
//     },
//     {
//       _id:"",
//       equipmentId:"",
//       quantity:"",
//       startDate:"",
//       endDate:"",
//       equipments:{}
//     }
//   ],
// }

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  equipment: [
    {
      equipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipment",
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
      startDate: { type: Date, required: true }, // Added startDate for each equipment
      endDate: { type: Date, required: true }, // Added endDate for each equipment
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cart", cartSchema);
