// import mongoose from "mongoose";
//
// // const messageSchema = new mongoose.Schema(
// //     {
// //         userId: { type: String, required: true },
// //         content: { type: String, required: true },
// //         sender: { type: String, enum: ["user", "assistant"], required: true },
// //     },
// //     { timestamps: true } // adds createdAt and updatedAt
// // );
//
// const messageSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     text: { type: String, required: true },
//     sender: { type: String, enum: ["user", "bot"], required: true },
//     timestamp: { type: Date, default: Date.now },
// });
//
// module.exports = mongoose.model("Message", messageSchema);


const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true }, // previously was "text", changed to match usage
    sender: { type: String, enum: ["user", "assistant"], required: true },
    replyText: { type: String, required: false },
}, { timestamps: true }); // adds createdAt and updatedAt

module.exports = mongoose.model("Message", messageSchema);
