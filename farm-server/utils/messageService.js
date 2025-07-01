// const Message = require("../models/Message");
import Message from "../models/Message";
// Get all messages for a user, sorted by time
async function getUserMessages(userId) {
    try {
        const messages = await Message.find({ userId })
            .sort({ timestamp: 1 })
            .exec();
        return messages;
    } catch (error) {
        throw new Error("Failed to fetch user messages: " + error.message);
    }
}

module.exports = {
    getUserMessages,
};
