import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId: String,
    status: {
        type: String,
        enum: ['open', 'resolved', 'flagged'],
        default: 'open'
    },
    summary: {
        type: String,
        default: 'New Inquiry'
    },
    currentConfidence: {
        type: Number,
        default: 1.0
    },
    customerEmail: {
        type: String,
        required: true
    },

}, { timestamps: true })

const Chat = mongoose.model("Chat", chatSchema)

export default Chat