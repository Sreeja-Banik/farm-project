// // const express = require("express");
// // const router = express.Router();
// // const { askGemini } = require("../utils/geminiService");
// // const Message = require("../models/Message");
// //
// // // import askGemini from "../utils/geminiService";
// // // import User from "../models/User";
// // // import Message from "../models/Message";
// //
// // // POST /api/chat
// // router.post("/", async (req, res) => {
// //     const { message, userId } = req.body;
// //
// //     if (!message || !userId) {
// //         return res.status(400).json({ error: "message and userId are required" });
// //     }
// //
// //     try {
// //         // Optionally retrieve user message history here if needed
// //         const prompt = `User: ${message}\nAI:`;
// //
// //         const replyText = await askGemini(prompt);
// //
// //         // Save both user and assistant messages
// //         const userMsg = await Message.create({
// //             userId,
// //             content: message,
// //             sender: "user",
// //         });
// //
// //         const assistantMsg = await Message.create({
// //             userId,
// //             content: replyText,
// //             sender: "assistant",
// //         });
// //
// //         res.json({
// //             message: {
// //                 id: assistantMsg._id.toString(),
// //                 content: assistantMsg.content,
// //                 sender: assistantMsg.sender,
// //                 timestamp: assistantMsg.createdAt,
// //             },
// //         });
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ error: "Failed to process chat message" });
// //     }
// // });
// //
// // module.exports = router;
//
//
//
// const express = require("express");
// const router = express.Router();
// const { askGemini } = require("../utils/geminiService");
// const Message = require("../models/Message");
//
// router.post("/", async (req, res) => {
//     const { message, userId } = req.body;
// console.log(message);
//     console.log(userId);
//     if (!message || !userId) {
//         return res.status(400).json({ error: "message and userId are required" });
//     }
//
//     try {
//         // Call Gemini API
//         const prompt = `User: ${message}\nAI:`;
//         const replyText = await askGemini(message);
//
//         // Save user message
//         const userMsg = await Message.create({
//             userId,
//             content: message,
//             sender: "user",
//         });
//
//         // Save assistant reply
//         const assistantMsg = await Message.create({
//             userId,
//             content: replyText,
//             sender: "assistant",
//         });
//
//         // Send formatted response
//         res.json({
//             message: {
//                 id: assistantMsg._id.toString(),
//                 content: assistantMsg.content,
//                 sender: assistantMsg.sender,
//                 timestamp: assistantMsg.createdAt,
//             },
//         });
//     } catch (err) {
//         console.error("Chat error:", err.message);
//         res.status(500).json({ error: "Failed to process chat message" });
//     }
// });
//
// module.exports = router;


const express = require("express");
const router = express.Router();
const {askGemini} = require("../utils/geminiService");
const Message = require("../models/Message");
const Order = require("../models/Order");
const User = require("../models/User");

// router.post("/", async (req, res) => {
//     const { message, userId } = req.body;
//
//     if (!message || !userId) {
//         return res.status(400).json({ error: "message and userId are required" });
//     }
//
//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }
//
//         // Example: get last 5 user messages
//         const history = await Message.find({ userId }).sort({ createdAt: -1 }).limit(5);
//
//         const context = history
//             .reverse() // oldest to newest
//             .map(msg => `${msg.sender === "user" ? "User" : "AI"}: ${msg.content}`)
//             .join("\n");
//
//         // Send the user input + context to Gemini
//         const replyText = await askGemini(message, context);
//
//         const userMsg = await Message.create({
//             userId,
//             content: message,
//             sender: "user",
//         });
//
//         const assistantMsg = await Message.create({
//             userId,
//             content: replyText,
//             sender: "assistant",
//         });
//
//         res.json({
//             message: {
//                 id: assistantMsg._id.toString(),
//                 content: assistantMsg.content,
//                 sender: assistantMsg.sender,
//                 timestamp: assistantMsg.createdAt,
//             },
//         });
//     } catch (err) {
//         console.error("Chat error:", err.message);
//         res.status(500).json({ error: "Failed to process chat message" });
//     }
// });


const Equipment = require("../models/Equipment");

router.post("/", async (req, res) => {
    const {message, userId} = req.body;

    if (!message || !userId) {
        return res.status(400).json({error: "message and userId are required"});
    }
    const keywords = [
        "equipment", "tractor", "plough", "harvester", "cultivator", "seeder",
        "sprayer", "power", "weight", "capacity", "implements", "thresher",
        "tiller", "baler", "mower", "disk", "fertilizer", "loader"
    ];

    const messageLower = message.toLowerCase();
    const matchesKeyword = keywords.some(keyword => messageLower.includes(keyword));

    try {
        let context = "";
        let equipments = "";
        if (matchesKeyword) {
            const equipmentList = await Equipment.find();
            equipments = equipmentList.map(e => `${e.name}: ${e.description}, 
            Rate: ₹${e.dailyRate}/day,
            equipmentId: ${e._id},
             provider: ${e.provider.name},
             serviceAreas:${e.serviceAreas},
             quantity:${e.quantity},
             quantityAvailable:${e.quantityAvailable},
             category:${e.category},
             quantityAvailable:${e.quantityAvailable},
             specifications:power:${e.specifications},
             power:${e.specifications.power},
             weight:${e.specifications.weight}`).join("\n");
        }
        const previousMessages = await Message.find({userId: userId}).sort({createdAt: -1});
        const history = previousMessages
            .reverse() // oldest to newest
            .map(msg => `${msg.sender === "user" ? "User" : "assistant"} asked: ${msg.content}, your response: ${msg.replyText}`)
            .join("\n");
        //order history
        const orderHistory = await Order.find({user: userId});
        // console.log("orderHistory --------------",orderHistory);
        const orderHistoryText = orderHistory
            .map(order => `Order ID: ${order._id}, EquipmentID: ${order.equipment.map(e => e.equipmentId).join(", ")}, Status: ${order.status}, ordered on: ${order.createdAt}, total amount: ₹${order.totalAmount}, contact info: ${order.contactInfo.name}, ${order.contactInfo.phone}, ${order.contactInfo.email}, delivery info: ${order.deliveryInfo.address}, ${order.deliveryInfo.city}, ${order.deliveryInfo.state}, ${order.deliveryInfo.zipCode}`)
            .join("\n");
        context = `
        These are the equipments available in our farm: \n${equipments},
        Here is the previous conversation history: \n${history},
        Here is the order history: \n${orderHistoryText},
        `;

        const replyText = await askGemini(message, context);

        const userMsg = await Message.create({userId, content: message, sender: "user", replyText: replyText});
        const assistantMsg = await Message.create({userId, content: replyText, sender: "assistant"});

        res.json({
            message: {
                id: assistantMsg._id.toString(),
                content: assistantMsg.content,
                sender: assistantMsg.sender,
                timestamp: assistantMsg.createdAt,
            },
        });
    } catch (err) {
        console.error("Chat error:", err.message);
        res.status(500).json({error: "Failed to process chat message"});
    }
});

module.exports = router;
