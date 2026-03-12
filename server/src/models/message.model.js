import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	chatId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Chat",
		required: true,
	},
	role: {
		type: String,
		enum: ["user", "model", "agent"],
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	confidenceScore: {
		type: Number,
		default: 0.0,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
